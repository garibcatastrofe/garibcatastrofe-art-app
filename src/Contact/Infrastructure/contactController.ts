"use server";

/* TYPES */
import { IResponse } from "@/src/Shared/Domain/Interfaces/IResponse";
import { handleServerError } from "@/src/Shared/Domain/utils/handleServerError";

/* SERVICE */
import { ServiceContainer } from "@/src/Shared/Infrastructure/ServiceContainer";

const { Contact: Contact } = ServiceContainer;

export async function SendMail(data: {
  nombre: string;
  correo: string;
  country: {
    dialCode: string;
    iso2: string;
    label: string;
  } | null;
  telefono: string;
  asunto: string;
  mensaje: string;
}): Promise<IResponse> {
  try {
    const comisionId = await Contact.SendMail.SendMailAsync(data);

    // Response
    return {
      ok: true,
      message: "Correo enviado correctamente: " + comisionId.toString(),
    };
  } catch (error) {
    return handleServerError(error);
  }
}
