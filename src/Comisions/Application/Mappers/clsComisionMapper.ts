import { clsComision } from "../../Domain/Entities/Main/clsComision";
import { IComisionPrimitive } from "../../Domain/Interfaces/IComisionPrimitive";

export class clsComisionMapper {
  public static ToPrimitive(comision: clsComision): IComisionPrimitive {
    return {
      tipo: comision.comisionTipo.value,
      descripcion: comision.comisionDescripcion.value,
      referencias: comision.comisionReferencias.toPrimitive(),
      fecha_vencimiento: comision.comisionFechaVencimiento.value,
    };
  }
}
