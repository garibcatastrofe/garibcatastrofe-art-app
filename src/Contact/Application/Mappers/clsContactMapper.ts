import { clsContact } from "../../Domain/Entitites/Main/clsContact";
import { IContactPrimitive } from "../../Domain/Interfaces/IContactPrimitive";

export class clsContactMapper {
  public static ToPrimitive(contact: clsContact): IContactPrimitive {
    return {
      nombre: contact.contactNombre.value,
      correo: contact.contactCorreo.value,
      lada: contact.contactLada.value,
      telefono: contact.contactTelefono.value,
      asunto: contact.contactAsunto.value,
      mensaje: contact.contactMensaje.value,
    };
  }
}
