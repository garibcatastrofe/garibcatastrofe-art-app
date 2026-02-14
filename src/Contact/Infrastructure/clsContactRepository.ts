import { IContactRepository } from "../Domain/Interfaces/IContactRepository";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export class clsContactRepository implements IContactRepository {
  public async SendMailAsync(data: {
    nombre: string;
    correo: string;
    lada: string;
    telefono: string;
    asunto: string;
    mensaje: string;
  }): Promise<number> {
    /* console.log("Datos en el repositorio: ", data); */

    await resend.emails.send({
      from: `Formulario de contacto <${process.env.EMAIL_FROM}>` /* "Resend <onboarding@resend.dev>" */,
      to: [process.env.EMAIL_TO!],
      replyTo: data.correo,
      subject: data.asunto,
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Nuevo mensaje desde el sitio web</h2>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Email:</strong> ${data.correo}</p>
          <p><strong>Teléfono:</strong> ${data.lada} ${data.telefono}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${data.mensaje}</p>
        </div>
      `,
    });

    /* console.log(response); */

    return 123;
  }
}
