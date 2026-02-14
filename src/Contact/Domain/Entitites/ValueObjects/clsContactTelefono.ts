import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsContactTelefono {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new clsBadRequestError("El teléfono es necesario");

    if (value.length !== 10)
      throw new clsBadRequestError("El teléfono debe ser de 10 dígitos");
  }
}
