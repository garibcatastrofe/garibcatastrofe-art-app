import { IComisionPrimitive } from "./IComisionPrimitive";

export interface IComisionRepository {
  InsertComisionAsync(comision: IComisionPrimitive): Promise<number>;
}
