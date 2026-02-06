"use server";

export async function newComisionController(data: {
  tipo: string;
  descripcion: string;
  referencias: { url: string }[];
  fecha_vencimiento?: Date | undefined;
}) {
  // Simulación de proceso
  await new Promise((r) => setTimeout(r, 3000));

  console.log(data)

  if (!data.descripcion) {
    return {
      ok: false,
      message: "Descripción requerida",
    };
  }

  // Guardar en DB, enviar correo, etc
  return {
    ok: true,
    message: "Formulario enviado correctamente",
  };
}
