import { db } from "@/db/index";
import { eq, asc, desc, count } from "drizzle-orm";

import { users } from "@/db/schemas/UserSchema";

import { IUserQuery } from "../Domain/Interfaces/IUserQuery";
import { IPaginatedResponse } from "../Domain/Interfaces/IPaginatedResponse";

import { IUserPrimitive } from "../Domain/Interfaces/IUserPrimitive";
import { IUserRepository } from "../Domain/Interfaces/IUserRepository";

export class clsUserRepository implements IUserRepository {
  public async InsertUserAsync(
    user: Omit<IUserPrimitive, "id">,
  ): Promise<number> {
    const [createdUser] = await db
      .insert(users)
      .values({
        user_name: user.user_name,
        correo: user.correo,
        password: user.password,
        clerk_user_id: user.clerk_user_id,
      })
      .returning({ id: users.id });

    return createdUser.id;
  }

  public async SelectUsersAsync({
    page,
    perPage,
    order,
    orderBy,
    eqAttribute,
    attribute,
  }: IUserQuery<IUserPrimitive>): Promise<
    IPaginatedResponse<Omit<IUserPrimitive, "password" | "clerk_user_id">>
  > {
    const whereCondition =
      eqAttribute === "id"
        ? eq(users.id, Number(attribute))
        : eqAttribute === "user_name"
          ? eq(users.user_name, attribute)
          : eqAttribute === "correo"
            ? eq(users.correo, attribute)
            : undefined;

    const rows = await db
      .select({
        id: users.id,
        user_name: users.user_name,
        correo: users.correo,
      })
      .from(users)
      .where(attribute !== "0" && whereCondition ? whereCondition : undefined)
      .orderBy(order === "asc" ? asc(users[orderBy]) : desc(users[orderBy]))
      .limit(perPage)
      .offset(page * perPage);

    const usuariosCount = await db.select({ count: count() }).from(users);

    return {
      data: rows,
      count: usuariosCount[0].count,
    };
  }

  public async UpdateUserAsync(
    id: number,
    user: Partial<IUserPrimitive>,
  ): Promise<void> {
    await db
      .update(users)
      .set({
        clerk_user_id: user.clerk_user_id,
      })
      .where(eq(users.id, id));
  }

  public async SelectUserSignInAsync(
    correo: string,
  ): Promise<IUserPrimitive | null> {
    const usersFound = await db
      .select()
      .from(users)
      .where(eq(users.correo, correo));
    return usersFound[0] ?? null;
  }
}
