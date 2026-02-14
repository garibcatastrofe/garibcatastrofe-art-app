import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsContactAsunto {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new clsBadRequestError("El asunto es necesario");

    if (value.length < 2)
      throw new clsBadRequestError("El asunto debe ser mayor de 2 caracteres");

    if (value.length > 50)
      throw new clsBadRequestError("El asunto debe ser menor a 50 caracteres");
  }
}
