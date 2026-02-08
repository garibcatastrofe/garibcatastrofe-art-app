"use server";

/* TYPES */
import { IResponse } from "@/src/Shared/Domain/Interfaces/IResponse";
import { handleServerError } from "@/src/Shared/Domain/utils/handleServerError";

/* SERVICE */
import { ServiceContainer } from "@/src/Shared/Infrastructure/ServiceContainer";

const { Comisions: Comision } = ServiceContainer;

export async function InsertComision(data: {
  tipo: string;
  descripcion: string;
  referencias: { url: string }[];
  fecha_vencimiento?: Date;
}): Promise<IResponse> {
  try {
    const comisionId = await Comision.InsertComision.InsertComisionAsync(data);

    // Response
    return {
      ok: true,
      message: "Correo enviado correctamente: " + comisionId.toString(),
    };
  } catch (error) {
    return handleServerError(error);
  }
}
