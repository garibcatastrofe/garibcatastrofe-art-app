"use server";

/* TYPES */
import { IResponse } from "@/src/Shared/Domain/Interfaces/IResponse";
import { handleServerError } from "@/src/Shared/Domain/utils/handleServerError";

/* SERVICE */
import { ServiceContainer } from "@/src/Shared/Infrastructure/ServiceContainer";

const { Users: User } = ServiceContainer;

export async function SignUp(data: {
  user_name: string;
  correo: string;
  password: string;
  password_confirm: string;
}): Promise<IResponse> {
  try {
    console.log("Entrando al controller de sign up...");

    await User.SignUp.SignUpAsync(data);

    return {
      ok: true,
      message:
        "Usuario creado éxitosamente, ¡Ahora puedes solicitar comisiones!",
    };
  } catch (error) {
    return handleServerError(error);
  }
}

export async function SignIn(data: {
  correo: string;
  password: string;
}): Promise<IResponse> {
  try {
    console.log("Entrando al controller de sign in...");

    await User.SignIn.SignInAsync(data);

    return {
      ok: true,
      message:
        "Sesión iniciada correctamente, ¡Ahora puedes solicitar comisiones!",
    };
  } catch (error) {
    return handleServerError(error);
  }
}
