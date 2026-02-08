import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";
import { clsUser } from "../../Domain/Entities/Main/clsUser";
import { clsUserCorreo } from "../../Domain/Entities/ValueObjects/clsUserCorreo";
import { clsUserPassword } from "../../Domain/Entities/ValueObjects/clsUserPassword";
import { clsUserUserName } from "../../Domain/Entities/ValueObjects/clsUserUserName";
import { IUserCreateDto } from "../../Domain/Interfaces/IUserCreateDto";
import { IUserRepository } from "../../Domain/Interfaces/IUserRepository";
import { clsUserMapper } from "../Mapper/clsUserMapper";
import bcrypt from "bcryptjs";
import { clerkClient } from "@clerk/nextjs/server";

export class clsSignUp {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async SignUpAsync({
    user_name,
    correo,
    password,
    password_confirm,
  }: IUserCreateDto): Promise<void> {
    if (password !== password_confirm)
      throw new clsBadRequestError("Las contraseñas deben de ser iguales");

    const userNameVerificado = new clsUserUserName(user_name);
    const correoVerificado = new clsUserCorreo(correo);
    const passwordVerificado = new clsUserPassword(password);

    const usersUserNameRepetido = await this.userRepository.SelectUsersAsync({
      page: 0,
      perPage: 1,
      order: "asc",
      orderBy: "id",
      attribute: userNameVerificado.value,
      eqAttribute: "user_name",
    });

    if (usersUserNameRepetido.data.length > 0) {
      throw new clsBadRequestError(
        "Ya existe una cuenta con ese nombre de usuario, intente con otro",
      );
    }

    const usersCorreoRepetido = await this.userRepository.SelectUsersAsync({
      page: 0,
      perPage: 1,
      order: "asc",
      orderBy: "id",
      attribute: correoVerificado.value,
      eqAttribute: "correo",
    });

    if (usersCorreoRepetido.data.length > 0) {
      throw new clsBadRequestError(
        "Ya existe una cuenta con ese correo, intente con otro",
      );
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    passwordVerificado.value = hashedPassword;

    const newUser = new clsUser(
      userNameVerificado,
      correoVerificado,
      passwordVerificado,
    );

    const userId = await this.userRepository.InsertUserAsync(
      clsUserMapper.ToPrimitive(newUser),
    );

    const clerk = await clerkClient();

    const clerkUser = await clerk.users.createUser({
      emailAddress: [correoVerificado.value],
      password,
      firstName: userNameVerificado.value
    });

    await this.userRepository.UpdateUserAsync(userId, {
      clerk_user_id: clerkUser.id,
    });
  }
}
