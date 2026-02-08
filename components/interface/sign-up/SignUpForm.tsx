"use client";

import Link from "next/link";
import { BouncingButton } from "../comision/BouncingButton";
import { Loader, Upload } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useAnnouncement } from "@/stores/announcementStore";
import { useState } from "react";
import { SignUp } from "@/src/Users/Infrastructure/userController";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

export type SignUpFormValues = {
  correo: string;
  password: string;
  password_confirm: string;
  user_name: string;
};

export function SignUpForm() {
  const { setAnnouncement } = useAnnouncement();
  const [terminado, setTerminado] = useState(true);
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      correo: "",
      password: "",
      password_confirm: "",
      user_name: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      console.log("Enviando datos desde el cliente...");
      console.log(data);

      setTerminado(false);

      if (!isLoaded || !signIn || !setActive) {
        console.warn("El gestor de sesión todavía no está listo");
        return;
      }

      const response = await SignUp(data);

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
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex justify-center items-center g-fit flex-col z-10 lg:w-1/2 w-full mb-24 mt-24">
      <h1
        className="pb-2 text-3xl font-medium"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Regístrarse
      </h1>
      <div className="flex gap-2">
        <h2 className="mb-4">¿Ya tienes una cuenta?</h2>
        <Link href={"/sign-in"} className="text-green-700 underline">
          Iniciar sesión
        </Link>
      </div>

      {/* NOMBRE DEL USUARIO */}
      <div className="flex flex-col items-start gap-4 w-full mb-4">
        <p>Nombre de usuario</p>
        <Controller
          name="user_name"
          control={methods.control}
          rules={{ required: "El nombre de usuario es necesario" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type="text"
              id="user_name"
              minLength={2}
              maxLength={50}
              placeholder="Nombre cool"
              className="w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
            />
          )}
        />
        {methods.formState.errors.user_name && (
          <p className="ml-1 text-red-500">
            {methods.formState.errors.user_name?.message}
          </p>
        )}
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
      <div className="flex flex-col items-start gap-4 mt-4 w-full">
        <p>Contraseña</p>
        <Controller
          name="password"
          control={methods.control}
          rules={{ required: "La contraseña es necesaria" }}
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

      {/* CONTRASEÑA CONFIRMADA DEL USUARIO */}
      <div className="flex flex-col items-start gap-4 mt-4 mb-8 w-full">
        <p>Confirmar contraseña</p>
        <Controller
          name="password_confirm"
          control={methods.control}
          rules={{ required: "La contraseña confirmada es necesaria" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type="password"
              id="password_confirm"
              minLength={2}
              maxLength={50}
              placeholder="*************"
              className="w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
            />
          )}
        />
        {methods.formState.errors.password_confirm && (
          <p className="ml-1 text-red-500">
            {methods.formState.errors.password_confirm?.message}
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
            <Upload className="size-4" />
            <span>Registrarse</span>
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
