import { IPaginatedResponse } from "./IPaginatedResponse";
import { IUserPrimitive } from "./IUserPrimitive";
import { IUserQuery } from "./IUserQuery";

export interface IUserRepository {
  InsertUserAsync(user: IUserPrimitive): Promise<number>;
  SelectUsersAsync(
    query: IUserQuery<IUserPrimitive>,
  ): Promise<
    IPaginatedResponse<Omit<IUserPrimitive, "password" | "clerk_user_id">>
  >;
  UpdateUserAsync(id: number, user: Partial<IUserPrimitive>): Promise<void>;
  SelectUserSignInAsync(correo: string): Promise<IUserPrimitive | null>;
}
