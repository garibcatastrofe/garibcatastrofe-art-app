import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsContactMensaje {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new clsBadRequestError("El mensaje es necesario");

    if (value.length < 2)
      throw new clsBadRequestError("El mensaje debe ser mayor de 2 caracteres");

    if (value.length > 750)
      throw new clsBadRequestError(
        "El mensaje debe ser menor a 750 caracteres",
      );
  }
}
