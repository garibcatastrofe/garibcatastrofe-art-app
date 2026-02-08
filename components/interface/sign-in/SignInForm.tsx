"use client";

import { BouncingButton } from "@/components/interface/comision/BouncingButton";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useAnnouncement } from "@/stores/announcementStore";
import { Loader, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignIn } from "@/src/Users/Infrastructure/userController";
import { useSignIn } from "@clerk/nextjs";

export type SignInFormValues = {
  correo: string;
  password: string;
};

export function SignInForm() {
  const { setAnnouncement } = useAnnouncement();
  const [terminado, setTerminado] = useState(true);
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const methods = useForm<SignInFormValues>({
    defaultValues: {
      correo: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      console.log("Enviando datos desde el cliente...");
      console.log(data);

      setTerminado(false);

      if (!isLoaded || !signIn || !setActive) {
        console.warn("El gestor de sesión todavía no está listo");
        return;
      }

      const response = await SignIn(data);

      if (response.ok) {
        setAnnouncement(
          true,
          "bg-green-700",
          <p className="text-white">{response.message}</p>,
        );

        setTerminado(true);

        const signInResult = await signIn.create({
          identifier: data.correo,
          password: data.password,
        });

        if (signInResult.status !== "complete") {
          setAnnouncement(
            true,
            "bg-red-700",
            <p className="text-white">
              Error en el servidor al iniciar sesión
            </p>,
          );
          return;
        }

        await setActive({ session: signInResult.createdSessionId });

        router.refresh();
        router.push("/");
      } else {
        setAnnouncement(
          true,
          "bg-red-700",
          <p className="text-white">{response.message}</p>,
        );

        setTerminado(true);
      }

      setTerminado(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex justify-center items-center g-fit flex-col z-10 lg:w-1/2 w-full mb-24 lg:mb-0">
      <h1
        className="pb-2 text-3xl font-medium"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Iniciar sesión
      </h1>
      <div className="flex gap-2">
        <h2 className="mb-4">¿No tienes una cuenta?</h2>
        <Link href={"/sign-up"} className="text-green-700 underline">
          Regístrarse
        </Link>
      </div>

      {/* CORREO DEL USUARIO */}
      <div className="flex flex-col items-start gap-4 w-full">
        <p>Correo</p>
        <Controller
          name="correo"
          control={methods.control}
          rules={{ required: "El correo es necesario" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type="text"
              id="correo"
              minLength={2}
              maxLength={50}
              placeholder="example@gmail.com"
              className="w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
            />
          )}
        />
        {methods.formState.errors.correo && (
          <p className="ml-1 text-red-500">
            {methods.formState.errors.correo?.message}
          </p>
        )}
      </div>

      {/* CONTRASEÑA DEL USUARIO */}
      <div className="flex flex-col items-start gap-4 mt-4 mb-8 w-full">
        <p>Contraseña</p>
        <Controller
          name="password"
          control={methods.control}
          rules={{ required: "La contraseña es necesario" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type="password"
              id="password"
              minLength={2}
              maxLength={50}
              placeholder="*************"
              className="w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
            />
          )}
        />
        {methods.formState.errors.password && (
          <p className="ml-1 text-red-500">
            {methods.formState.errors.password?.message}
          </p>
        )}
      </div>

      {/* BOTÓN PARA INGRESAR */}
      <BouncingButton
        action={terminado ? methods.handleSubmit(onSubmit) : () => {}}
        widthTailwind="w-full"
        heightTailwind="h-fit"
        backgroundColorRgba="rgba(0, 0, 0, 0)"
        backgroundColorHoverRgba="#15803d"
        pxTailwind="px-4"
        pyTailwind="py-3"
      >
        {terminado ? (
          <>
            <LogIn className="size-4" />
            <span>Ingresar</span>
          </>
        ) : (
          <>
            <span className="text-transparent">E</span>
            <Loader className="size-4 animate-spin" />
            <span className="text-transparent">E</span>
          </>
        )}
      </BouncingButton>
    </div>
  );
}
