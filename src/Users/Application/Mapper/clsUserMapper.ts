import { clsUser } from "../../Domain/Entities/Main/clsUser";
import { IUserPrimitive } from "../../Domain/Interfaces/IUserPrimitive";

export class clsUserMapper {
  public static ToPrimitive(user: clsUser): IUserPrimitive {
    return {
      user_name: user.userUserName.value,
      correo: user.userCorreo.value,
      password: user.userPassword.value,
      clerk_user_id: "",
    };
  }
}
