import { IUserPrimitive } from "./IUserPrimitive";

export interface IUserCreateDto extends Omit<IUserPrimitive, "id" | "clerk_user_id"> {
  id?: number;
  user_name: string;
  correo: string;
  password: string;
  password_confirm: string;
}
