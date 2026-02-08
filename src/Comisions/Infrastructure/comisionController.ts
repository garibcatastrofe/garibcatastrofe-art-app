"use server";

/* TYPES */
import { Response } from "@/src/Shared/response";

/* SERVICE */
import { ServiceContainer } from "@/src/Shared/Infrastructure/ServiceContainer";

const { Comisions: Comision } = ServiceContainer;

export async function InsertComision(data: {
  tipo: string;
  descripcion: string;
  referencias: { url: string }[];
  fecha_vencimiento?: Date;
}): Promise<Response> {
  try {
    console.log("Entrando al controller de insert comision...");

    const comisionId = await Comision.InsertComision.InsertComisionAsync(data);

    // Response
    return {
      ok: true,
      message: "Correo enviado correctamente: " + comisionId.toString(),
    };
  } catch {
    return {
      ok: false,
      message:
        "Error al envíar el correo: Verifique los datos e intente nuevamente",
    };
  }
}
