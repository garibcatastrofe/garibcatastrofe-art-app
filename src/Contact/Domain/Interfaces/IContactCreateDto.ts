export interface IContactCreateDto {
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
}
