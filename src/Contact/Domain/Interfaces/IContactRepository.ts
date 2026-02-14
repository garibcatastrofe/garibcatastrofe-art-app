import { IContactPrimitive } from "./IContactPrimitive";

export interface IContactRepository {
  SendMailAsync(comision: IContactPrimitive): Promise<number>;
}
