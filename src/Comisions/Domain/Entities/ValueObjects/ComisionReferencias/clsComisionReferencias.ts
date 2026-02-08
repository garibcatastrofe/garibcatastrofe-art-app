import { clsBadRequestError } from "@/src/Shared/Domain/Entities/Errors/clsBadRequestError";
import { IUrlObjectPrimitive } from "../../../Interfaces/IComisionPrimitive";
import { clsUrlObject } from "./clsUrlObject";

export class clsComisionReferencias {
  public urlArray: clsUrlObject[];

  public constructor(urlArray: clsUrlObject[]) {
    this.ensureIsValid(urlArray);
    this.urlArray = urlArray;
  }

  private ensureIsValid(urlArray: clsUrlObject[]): void {
    if (urlArray.length > 5) {
      throw new clsBadRequestError("No puedes mandar más de 5 url");
    }
  }

  public toPrimitive(): IUrlObjectPrimitive[] {
    return this.urlArray.map((m) => m.toPrimitive());
  }
}
