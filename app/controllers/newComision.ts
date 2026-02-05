"use server"

export async function sendForm(data: {
  email: string
  message: string
}) {
  // Simulación de proceso
  await new Promise((r) => setTimeout(r, 1500))

  if (!data.email) {
    return {
      ok: false,
      message: "Email requerido",
    }
  }

  // Guardar en DB, enviar correo, etc
  return {
    ok: true,
    message: "Formulario enviado correctamente",
  }
}