export interface IComisionPrimitive {
  id?: number;
  tipo: string;
  descripcion: string;
  referencias: IUrlObjectPrimitive[];
  fecha_vencimiento?: Date;
}

export interface IUrlObjectPrimitive {
  url: string;
}
