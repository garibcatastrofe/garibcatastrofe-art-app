import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsContactLada {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new clsBadRequestError("La lada es necesaria");

    if (value.length < 2)
      throw new clsBadRequestError("La lada debe ser mayor de 2 caracteres");

    if (value.length > 50)
      throw new clsBadRequestError("La lada debe ser menor a 50 caracteres");
  }
}
