import { IUserPrimitive } from "./IUserPrimitive";

export interface IUserQuery<T> {
  page: number;
  perPage: number;
  order: "asc" | "desc";
  orderBy: UnionKeys<IUserPrimitive>;
  eqAttribute: UnionKeys<T>;
  attribute: string;
}

type UnionKeys<T> = T extends T ? keyof T : never;
