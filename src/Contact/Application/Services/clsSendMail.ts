import { clsContactMapper } from "../Mappers/clsContactMapper";
import { IContactRepository } from "../../Domain/Interfaces/IContactRepository";
import { IContactCreateDto } from "../../Domain/Interfaces/IContactCreateDto";
import { clsContact } from "../../Domain/Entitites/Main/clsContact";
import { clsContactNombre } from "../../Domain/Entitites/ValueObjects/clsContactNombre";
import { clsContactCorreo } from "../../Domain/Entitites/ValueObjects/clsContactCorreo";
import { clsContactLada } from "../../Domain/Entitites/ValueObjects/clsContactLada";
import { clsContactTelefono } from "../../Domain/Entitites/ValueObjects/clsContactTelefono";
import { clsContactAsunto } from "../../Domain/Entitites/ValueObjects/clsContactAsunto";
import { clsContactMensaje } from "../../Domain/Entitites/ValueObjects/clsContactMensaje";

export class clsSendMail {
  public constructor(private readonly contactRepository: IContactRepository) {}

  public async SendMailAsync({
    nombre,
    correo,
    country,
    telefono,
    asunto,
    mensaje,
  }: IContactCreateDto): Promise<number> {
    const newContact = new clsContact(
      new clsContactNombre(nombre),
      new clsContactCorreo(correo),
      new clsContactLada(country === null ? "" : country.label),
      new clsContactTelefono(telefono),
      new clsContactAsunto(asunto),
      new clsContactMensaje(mensaje),
    );

    const contactId = await this.contactRepository.SendMailAsync(
      clsContactMapper.ToPrimitive(newContact),
    );

    return contactId;
  }
}
