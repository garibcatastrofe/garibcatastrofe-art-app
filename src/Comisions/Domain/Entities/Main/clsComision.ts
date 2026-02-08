import { clsComisionTipo } from "../ValueObjects/clsComisionTipo";
import { clsComisionDescripcion } from "../ValueObjects/clsComisionDescripcion";
import { clsComisionReferencias } from "../ValueObjects/ComisionReferencias/clsComisionReferencias";
import { clsComisionFechaVencimiento } from "../ValueObjects/clsComisionFechaVencimiento";

export class clsComision {
  public comisionTipo: clsComisionTipo;
  public comisionDescripcion: clsComisionDescripcion;
  public comisionReferencias: clsComisionReferencias;
  public comisionFechaVencimiento: clsComisionFechaVencimiento;

  public constructor(
    tipo: clsComisionTipo,
    descripcion: clsComisionDescripcion,
    referencias: clsComisionReferencias,
    fecha_vencimiento: clsComisionFechaVencimiento,
  ) {
    this.comisionTipo = tipo;
    this.comisionDescripcion = descripcion;
    this.comisionReferencias = referencias;
    this.comisionFechaVencimiento = fecha_vencimiento;

    console.log("Pasó el constructor de comisión")
  }
}
