"use client";

/* COMPONENTS */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BouncingButton } from "@/components/interface/comision/BouncingButton";
import { ImageUrlPreview } from "@/components/interface/comision/ImageUrlPreview";
import { Modal } from "@/components/shared/modal/Modal";
import { ModalBodyUpdateUrl } from "@/components/interface/comision/ModalBodyUpdateUrl";

/* HOOKS */
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { useState } from "react";

/* ICONS */
import {
  PencilLine,
  Plus,
  Tablet,
  Calendar as Calendario,
  Trash2,
  Send,
  Loader,
} from "lucide-react";

/* SERVER ACTIONS */
import { InsertComision } from "@/src/Comisions/Infrastructure/comisionController";

/* STORES */
import { useAnnouncement } from "@/stores/announcementStore";
import { useModal } from "@/stores/modalStore";

/* LIBRARIES */
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export type ComisionFormValues = {
  tipo: "digital" | "tradicional";
  descripcion: string;
  referencias: {
    url: string;
  }[];
  fecha_vencimiento?: Date;
};

export function ComisionFormChildren() {
  const { setAnnouncement } = useAnnouncement();
  const { setModal } = useModal();
  const [terminado, setTerminado] = useState(true);

  const methods = useForm<ComisionFormValues>({
    defaultValues: {
      tipo: "digital",
      descripcion: "",
      referencias: [{ url: "" }, { url: "" }],
      fecha_vencimiento: undefined,
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: methods.control,
    name: "referencias",
  });

  const referencias = useWatch({
    control: methods.control,
    name: "referencias",
  });

  const onSubmit = async (data: ComisionFormValues) => {
    try {
      console.log("Enviando datos desde el cliente...");
      console.log("data: ", data);

      setTerminado(false);

      const response = await InsertComision(data);

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
          <p className="text-white">
            Ocurrió un error al envíar el correo: Revise los datos e intente
            nuevamente
          </p>,
        );
        setTerminado(true);
      }

      console.log(response);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="lg:w-1/2 w-full mb-24">
      <FormProvider {...methods}>
        <Modal />
        {/* TIPO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Tipo de ilustración</p>
          <Controller
            name="tipo"
            control={methods.control}
            rules={{
              required: "Por favor selecciona que tipo de ilustración deseas",
            }}
            render={({ field }) => (
              <div className="flex gap-4 w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    backgroundColor: { duration: 0.3 },
                  }}
                  animate={{
                    backgroundColor:
                      field.value === "digital"
                        ? "#15803d" // green-700
                        : "rgba(15, 23, 42, 0.7)", // slate-800/70
                  }}
                  className={`px-4 py-2 rounded-xl flex gap-2 items-center w-full justify-center cursor-pointer ${field.value === "digital" ? "" : "hover:bg-slate-700/70"}`}
                  onClick={() => field.onChange("digital")}
                >
                  <Tablet className="size-4" />
                  <span>Digital</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    backgroundColor: { duration: 0.3 },
                  }}
                  animate={{
                    backgroundColor:
                      field.value === "tradicional"
                        ? "#15803d" // green-500
                        : "rgba(15, 23, 42, 0.7)", // slate-800/70
                  }}
                  className={`px-4 py-2 rounded-xl flex gap-2 items-center w-full justify-center cursor-pointer ${field.value === "tradicional" ? "" : "hover:bg-slate-700/70"}`}
                  onClick={() => field.onChange("tradicional")}
                >
                  <PencilLine className="size-4" />
                  <span>Tradicional</span>
                </motion.div>
              </div>
            )}
          />
          {methods.formState.errors.tipo && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.tipo.message}
            </p>
          )}
        </div>

        {/* DESCRIPCIÓN DE LA ILUSTRACIÓN */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Descripción</p>
          <Controller
            name="descripcion"
            control={methods.control}
            rules={{ required: "La descripción es necesaria" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textarea
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="descripcion"
                minLength={1}
                maxLength={750}
                placeholder="Por ejemplo: Me gustaría que mi ilustración tuviera... Quiero que mi ilustración sea de un estilo... Según los links adjuntos, quiero que combines todo y..."
                className="w-full h-40 p-4 bg-transparent outline-none border-2 border-neutral-100 resize-none rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
              />
            )}
          />
          {methods.formState.errors.descripcion && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.descripcion?.message}
            </p>
          )}
        </div>

        {/* REFERENCIAS EN URL E IMAGEN PREVISUALIZADA */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Referencias en url (opcional)</p>
          {methods.formState.errors.referencias && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.referencias.message}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4 w-full h-fit">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-4">
                <BouncingButton
                  action={() =>
                    setModal(
                      true,
                      "Ingresar URL",
                      <ModalBodyUpdateUrl index={index} />,
                    )
                  }
                  widthTailwind="w-32"
                  heightTailwind="h-32"
                  backgroundColorRgba="rgba(0, 0, 0, 0)"
                  backgroundColorHoverRgba="rgba(15, 23, 42, 0.7)"
                  pxTailwind="px-0"
                  pyTailwind="py-0"
                >
                  <ImageUrlPreview
                    url={referencias?.[index]?.url ?? ""}
                    rounded
                  />
                </BouncingButton>

                <input
                  type="hidden"
                  {...methods.register(`referencias.${index}.url`)}
                />

                <BouncingButton
                  action={() => {
                    console.log("Eliminando: ", index);
                    remove(index);
                  }}
                  widthTailwind="w-full"
                  heightTailwind="h-fit"
                  backgroundColorRgba="rgba(0, 0, 0, 0)"
                  backgroundColorHoverRgba="#ef4444"
                  pxTailwind="px-0"
                  pyTailwind="py-2"
                >
                  <Trash2 className="size-4" />
                </BouncingButton>
              </div>
            ))}
            {(fields.length ?? 0) < 5 && (
              <BouncingButton
                action={() => append({ url: "" })}
                widthTailwind="w-32"
                heightTailwind="h-32"
                backgroundColorRgba="rgba(0, 0, 0, 0)"
                backgroundColorHoverRgba="rgba(15, 23, 42, 0.7)"
                pxTailwind="px-0"
                pyTailwind="py-0"
              >
                <Plus className="size-10" />
              </BouncingButton>
            )}
          </div>
        </div>

        {/* FECHA DE VENCIMIENTO */}
        <div className="flex flex-col items-start gap-4 my-4 w-full">
          <p>Fecha de vencimiento (opcional)</p>
          <Controller
            name="fecha_vencimiento"
            control={methods.control}
            /* rules={{ required: "La fecha de inicio es requerida" }} */
            render={({ field: { onChange, value } }) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full p-6 bg-transparent justify-between border-2 border-neutral-100 text-left rounded-xl hover:bg-slate-900/50 cursor-pointer font-normal">
                      {value ? (
                        format(value, "PPP", { locale: es })
                      ) : (
                        <span className="text-neutral-500">
                          Selecciona una fecha
                        </span>
                      )}
                      <Calendario className="size-5" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    style={{ backdropFilter: "blur(15px)" }}
                    className="w-auto p-0 bg-slate-900/50 border-2 border-neutral-100 text-white"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={onChange}
                      locale={es}
                      disabled={(date) => date < today}
                      /* initialFocus */
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {methods.formState.errors.fecha_vencimiento && (
            <p className="ml-1 text-red-500">
              {methods.formState.errors.fecha_vencimiento.message}
            </p>
          )}
        </div>

        {/* BOTÓN PARA AGREGAR */}
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
              <span>Envíar comisión</span>
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
