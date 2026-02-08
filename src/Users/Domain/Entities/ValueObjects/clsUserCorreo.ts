import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsUserCorreo {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new clsBadRequestError("El correo es necesario");

    if (value.length < 5)
      throw new clsBadRequestError("El correo debe ser mayor de 5 caracteres");

    if (value.length > 50)
      throw new clsBadRequestError("El correo debe ser menor a 50 caracteres");
  }
}
