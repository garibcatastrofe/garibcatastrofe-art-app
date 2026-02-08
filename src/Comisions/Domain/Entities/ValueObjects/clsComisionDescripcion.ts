export class clsComisionDescripcion {
  public value: string;
  private campo = "descripcion";

  public constructor(value: string) {
    this.EnsureIsValid(value);
    this.value = value;
  }

  private EnsureIsValid(value: string): void {
    if (!value) throw new Error("La descripción es necesaria");

    if (value.length > 750)
      throw new Error("La descripción debe ser de menos de 750 caracteres");
  }
}
