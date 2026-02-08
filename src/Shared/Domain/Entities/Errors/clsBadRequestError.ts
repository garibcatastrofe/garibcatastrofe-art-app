import { clsAppError } from "./clsAppError";

// Al igual que este, se pueden crear más clases de Error constumizables, como de no autorizado o no encontrado
export class clsBadRequestError extends clsAppError {
  constructor(message: string) {
    super(message, 400);
  }
}
