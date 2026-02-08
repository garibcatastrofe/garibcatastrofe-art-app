import {
  TIPO_COMISION,
  TipoComisionType,
} from "@/src/Comisions/Domain/Interfaces/TipoComision";

export class clsComisionTipo {
  public value: string;
  private campo = "tipo";

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) {
      throw new Error("Favor de seleccionar un tipo de comisión");
    }
    if (!TIPO_COMISION.includes(value as TipoComisionType)) {
      throw new Error(
        "Favor de seleccionar un valor válido de tipo de comisión: digital o tradicional",
      );
    }
  }
}
