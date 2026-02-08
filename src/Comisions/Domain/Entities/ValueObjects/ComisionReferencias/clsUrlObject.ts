import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";
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
      throw new clsBadRequestError("Las url deben ser menores a 750 caracteres");
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
