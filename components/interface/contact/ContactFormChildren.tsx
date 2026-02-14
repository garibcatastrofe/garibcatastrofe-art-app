"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/interface/comision/BouncingButton";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";

/* HOOKS */
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Send, Loader } from "lucide-react";

/* SERVER ACTIONS */
import { SendMail } from "@/src/Contact/Infrastructure/contactController";

/* STORES */
import { useAnnouncement } from "@/stores/announcementStore";

/* LIBRARIES */
import { phoneCountries, PhoneCountry } from "@/lib/phone-countries";

export type ContactFormValues = {
  nombre: string;
  correo: string;
  country: PhoneCountry | null;
  telefono: string;
  asunto: string;
  mensaje: string;
  aviso_privacidad: boolean;
};

export function ContactFormChildren() {
  const { setAnnouncement } = useAnnouncement();
  const [terminado, setTerminado] = useState(true);

  const methods = useForm<ContactFormValues>({
    defaultValues: {
      nombre: "",
      correo: "",
      country: phoneCountries.find((c) => c.iso2 === "MX") ?? null,
      telefono: "",
      asunto: "",
      mensaje: "",
      aviso_privacidad: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setTerminado(false);
      console.log("Datos desde el front: ", data)

      const response = await SendMail(data);

      if (response.ok) {
        setAnnouncement(
          true,
          "bg-green-700",
          <p className="text-white">Correo envíado correctamente</p>,
        );
        setTerminado(true);
        methods.reset();
      } else {
        setAnnouncement(
          true,
          "bg-red-700",
          <p className="text-white">{response.message}</p>,
        );
        setTerminado(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="lg:w-1/2 w-full mb-24 px-4 lg:px-0">
      <FormProvider {...methods}>
        {/* NOMBRE */}
        <div className="flex flex-col items-start gap-4 w-full mb-4">
          <p>Nombre</p>
          <Controller
            name="nombre"
            control={methods.control}
            rules={{ required: "El nombre es necesario" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="nombre"
                minLength={2}
                maxLength={50}
                placeholder="Nombre cool"
                className="w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
              />
            )}
          />
          {methods.formState.errors.nombre && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.nombre?.message}
            </p>
          )}
        </div>

        {/* CORREO */}
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
                placeholder="example@tucorreo.com"
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

        {/* TELÉFONO */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Teléfono</p>
          <div className="w-full h-fit flex-col flex gap-4 lg:flex-row">
            {/* LADAS */}
            <Controller
              name="country"
              control={methods.control}
              render={({ field }) => (
                <Combobox
                  items={phoneCountries}
                  value={field.value}
                  onValueChange={field.onChange}
                  itemToStringValue={(country) => country?.label ?? ""}
                >
                  <ComboboxInput
                    placeholder="Buscar país..."
                    className={
                      "outline-none lg:w-1/2 w-full py-2 border-2 border-neutral-100 rounded-xl h-15 hover:bg-slate-900/50 transition-all duration-300"
                    }
                  />

                  <ComboboxContent
                    className="bg-slate-900/50 border-2 border-neutral-100 text-white h-48"
                    style={{ backdropFilter: "blur(15px)" }}
                  >
                    <ComboboxEmpty>No se encontraron países</ComboboxEmpty>

                    <ComboboxList>
                      {(country) => (
                        <ComboboxItem
                          key={country.iso2}
                          value={country}
                          className={"data-highlighted:bg-slate-800"}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-white">
                              {country.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {country.iso2}
                            </span>
                          </div>
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />

            <Controller
              name="telefono"
              control={methods.control}
              rules={{ required: "El teléfono es requerido" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                    onChange(val); // Actualiza el estado con solo números
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "-" || e.key === "+") {
                      e.preventDefault(); // Bloquea la entrada de estos caracteres
                    }
                  }}
                  value={value}
                  type="text" // Cambia a "text" para evitar comportamientos extraños con números
                  inputMode="numeric" // Ayuda en móviles
                  pattern="[0-9]*" // Solo números
                  id="telefono"
                  placeholder="555 8888"
                  minLength={10}
                  maxLength={10}
                  className="lg:w-1/2 w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
                />
              )}
            />
          </div>
          {methods.formState.errors.telefono && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.telefono.message}
            </p>
          )}
        </div>

        {/* ASUNTO */}
        <div className="flex flex-col items-start gap-4 w-full">
          <p>Asunto</p>
          <Controller
            name="asunto"
            control={methods.control}
            rules={{ required: "El asunto es necesario" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="asunto"
                minLength={2}
                maxLength={50}
                placeholder="Ingrese el asunto de su correo"
                className="w-full h-fit p-4 bg-transparent outline-none border-2 border-neutral-100 rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
              />
            )}
          />
          {methods.formState.errors.asunto && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.asunto?.message}
            </p>
          )}
        </div>

        {/* MENSAJE */}
        <div className="flex flex-col items-start gap-4 mt-4 mb-6">
          <p>Mensaje</p>
          <Controller
            name="mensaje"
            control={methods.control}
            rules={{ required: "El mensaje es necesario" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textarea
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="mensaje"
                minLength={1}
                maxLength={750}
                placeholder="Ingrese el mensaje que desea envíar"
                className="w-full h-40 p-4 bg-transparent outline-none border-2 border-neutral-100 resize-none rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
              />
            )}
          />
          {methods.formState.errors.mensaje && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.mensaje?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-4 mt-4 mb-6">
          <Controller
            name="aviso_privacidad"
            control={methods.control}
            rules={{ required: "Debe aceptar los términos y condiciones" }}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(Boolean(checked))
                  }
                />
                <label className="text-sm">Acepto términos y condiciones</label>
              </div>
            )}
          />
          {methods.formState.errors.aviso_privacidad && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.aviso_privacidad?.message}
            </p>
          )}
        </div>

        {/* BOTÓN PARA ENVÍAR */}
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
              <Send className="size-4" />
              <span>Envíar correo</span>
            </>
          ) : (
            <>
              <span className="text-transparent">E</span>
              <Loader className="size-4 animate-spin" />
              <span className="text-transparent">E</span>
            </>
          )}
        </BouncingButton>
      </FormProvider>
    </div>
  );
}
