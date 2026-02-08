import {
  TIPO_COMISION,
  TipoComisionType,
} from "@/src/Comisions/Domain/Interfaces/TipoComision";
import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsComisionTipo {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) {
      throw new clsBadRequestError("Favor de seleccionar un tipo de comisión");
    }
    if (!TIPO_COMISION.includes(value as TipoComisionType)) {
      throw new clsBadRequestError(
        "Favor de seleccionar un valor válido de tipo de comisión: digital o tradicional",
      );
    }
  }
}
