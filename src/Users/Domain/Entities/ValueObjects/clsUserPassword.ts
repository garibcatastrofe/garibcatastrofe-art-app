import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";

export class clsUserPassword {
  public value: string;

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new clsBadRequestError("La contraseña es necesaria");

    if (value.length < 8)
      throw new clsBadRequestError(
        "La contraseña debe ser mayor de 8 caracteres",
      );

    if (value.length > 50)
      throw new clsBadRequestError(
        "La contraseña debe ser menor a 50 caracteres",
      );

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(value)) {
      throw new clsBadRequestError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
      );
    }
  }
}
