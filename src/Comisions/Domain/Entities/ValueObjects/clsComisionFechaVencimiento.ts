export class clsComisionFechaVencimiento {
  public value: Date | undefined;
  private campo = 'fecha_vencimiento';

  public constructor(value: Date | undefined) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: Date | undefined): void {
    if(!value) return

    let dateStr: string;
    if (value instanceof Date) {
      dateStr = value.toISOString().slice(0, 10);
    } else {
      dateStr = value;
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) {
      throw new Error("La fecha no se ingresó en formato correcto")
    }

    // Validar que la fecha sea válida
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error("La fecha ingresada no es válida")
    }
  }
}
