import { IComisionPrimitive, IUrlObjectPrimitive } from "./IComisionPrimitive";

export interface IComisionCreateDto extends Omit<IComisionPrimitive, "id"> {
  id?: number;
  tipo: string;
  descripcion: string;
  referencias: IUrlObjectPrimitive[];
  fecha_vencimiento?: Date;
}
