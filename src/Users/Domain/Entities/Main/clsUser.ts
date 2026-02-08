import { clsUserUserName } from "../ValueObjects/clsUserUserName";
import { clsUserCorreo } from "../ValueObjects/clsUserCorreo";
import { clsUserPassword } from "../ValueObjects/clsUserPassword";

export class clsUser {
  public userUserName: clsUserUserName;
  public userCorreo: clsUserCorreo;
  public userPassword: clsUserPassword;

  public constructor(
    user_name: clsUserUserName,
    correo: clsUserCorreo,
    password: clsUserPassword,
  ) {
    this.userUserName = user_name;
    this.userCorreo = correo;
    this.userPassword = password;
  }
}
