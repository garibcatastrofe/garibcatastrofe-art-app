import { clsAppError } from "../Entities/Errors/clsAppError";
import { IResponse } from "../Interfaces/IResponse";

export function handleServerError(error: unknown): IResponse {
  if (error instanceof clsAppError) {
    return { ok: false, message: error.message };
  }

  console.error(error);

  return {
    ok: false,
    message: "Error interno: verifique la información e intentelo nuevamente",
  };
}
