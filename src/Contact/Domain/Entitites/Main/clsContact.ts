import { clsContactNombre } from "../ValueObjects/clsContactNombre";
import { clsContactCorreo } from "../ValueObjects/clsContactCorreo";
import { clsContactLada } from "../ValueObjects/clsContactLada";
import { clsContactTelefono } from "../ValueObjects/clsContactTelefono";
import { clsContactAsunto } from "../ValueObjects/clsContactAsunto";
import { clsContactMensaje } from "../ValueObjects/clsContactMensaje";

export class clsContact {
  public contactNombre: clsContactNombre;
  public contactCorreo: clsContactCorreo;
  public contactLada: clsContactLada;
  public contactTelefono: clsContactTelefono;
  public contactAsunto: clsContactAsunto;
  public contactMensaje: clsContactMensaje;

  public constructor(
    nombre: clsContactNombre,
    correo: clsContactCorreo,
    lada: clsContactLada,
    telefono: clsContactTelefono,
    asunto: clsContactAsunto,
    mensaje: clsContactMensaje,
  ) {
    this.contactNombre = nombre;
    this.contactCorreo = correo;
    this.contactLada = lada;
    this.contactTelefono = telefono;
    this.contactAsunto = asunto;
    this.contactMensaje = mensaje;
  }
}
