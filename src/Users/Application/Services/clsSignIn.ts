import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";
import { IUserRepository } from "../../Domain/Interfaces/IUserRepository";
import bcrypt from "bcryptjs";

export class clsSignIn {
  public constructor(private readonly userRepository: IUserRepository) {}

  public async SignInAsync({
    correo,
    password,
  }: {
    correo: string;
    password: string;
  }): Promise<void> {
    if (!correo || !password)
      throw new clsBadRequestError(
        "El correo y la contraseña son obligatorios",
      );

    const userFound = await this.userRepository.SelectUserSignInAsync(correo);
    if (!userFound) throw new clsBadRequestError("Credenciales inválidas");

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) throw new clsBadRequestError("Credenciales inválidas");

    if (!userFound.clerk_user_id)
      throw new clsBadRequestError(
        "El usuario no está correctamente vínculado, llene y envíe el formulario de contácto y en breve recibirá apoyo",
      );
  }
}
