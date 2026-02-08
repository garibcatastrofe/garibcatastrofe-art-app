import { IUrlObjectPrimitive } from "../../../Interfaces/IComisionPrimitive";

export class clsUrlObject {
  public url: string;

  private constructor(url: string) {
    this.url = url;
  }

  public static create(url: string): clsUrlObject | null {
    // Validaciones antes de crear la instancia
    if (!url || url.length === 0 || url === "") return null;

    if (url.length >= 750) {
      throw new Error("Las url deben ser menores a 750");
    }

    // Si pasa todas las validaciones, se crea la instancia
    return new clsUrlObject(url);
  }

  public toPrimitive(): IUrlObjectPrimitive {
    return {
      url: this.url,
    };
  }
}
