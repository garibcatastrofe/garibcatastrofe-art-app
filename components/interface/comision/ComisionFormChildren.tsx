"use client";

import { useAnnouncement } from "@/stores/announcementStore";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { PencilLine, Plus, Tablet, Calendar as Calendario } from "lucide-react";
import { ImageUrlPreview } from "./ImageUrlPreview";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ButtonImage } from "./ButtonImage";
import { useModal } from "@/stores/modalStore";
import { ModalBodyUpdateUrl } from "./ModalBodyUpdateUrl";

export function ComisionFormChildren() {
  const { setAnnouncement } = useAnnouncement();
  const { setModal } = useModal();
  const [imgReferencias, setImgReferencias] = useState<string[] | null>([
    "",
    "",
  ]);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipo: "digital",
      descripcion: "123",
      referencias: [] as string[],
      fecha_vencimiento: undefined,
    },
  });

  const onSubmit = async (data: {
    tipo: string;
    descripcion: string;
    referencias: string[];
    fecha_vencimiento: Date | undefined;
  }) => {
    try {
      console.log("Enviando datos...");
      console.log(data);
      console.log(data.fecha_vencimiento);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="lg:w-1/2 w-full">
      {/* TIPO */}
      <div className="flex flex-col items-start gap-4 mb-2">
        <p>Tipo de ilustración</p>
        <Controller
          name="tipo"
          control={control}
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
                      ? "rgb(34 197 94)" // green-500
                      : "rgba(15, 23, 42, 0.7)", // slate-800/70
                }}
                className={`px-4 py-2 rounded-xl flex gap-2 items-center w-full justify-center cursor-pointer ${field.value === "digital" ? "" : "hover:bg-slate-700/70"}`}
                onClick={() => field.onChange("digital")}
              >
                <Tablet className="size-5" />
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
                      ? "rgb(34 197 94)" // green-500
                      : "rgba(15, 23, 42, 0.7)", // slate-800/70
                }}
                className={`px-4 py-2 rounded-xl flex gap-2 items-center w-full justify-center cursor-pointer ${field.value === "tradicional" ? "" : "hover:bg-slate-700/70"}`}
                onClick={() => field.onChange("tradicional")}
              >
                <PencilLine className="size-5" />
                <span>Tradicional</span>
              </motion.div>
            </div>
          )}
        />
        {errors.tipo && (
          <p className="ml-1 text-red-500">{errors.tipo.message}</p>
        )}
      </div>

      {/* DESCRIPCIÓN DE LA ILUSTRACIÓN */}
      <div className="flex flex-col items-start gap-4 my-4">
        <p>Descripción</p>
        <Controller
          name="descripcion"
          control={control}
          rules={{ required: "La descripción es necesaria" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <textarea
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              id="descripcion"
              minLength={30}
              maxLength={750}
              placeholder="Por ejemplo: Me gustaría que mi ilustración tuviera... Quiero que mi ilustración sea de un estilo... Según los links adjuntos, quiero que combines todo y..."
              className="w-full h-40 p-4 bg-transparent outline-none border-2 border-neutral-100 resize-none rounded-xl hover:bg-slate-900/50 transition-all duration-300 placeholder:text-neutral-500"
            />
          )}
        />
        {errors.descripcion && (
          <p className="ml-1 text-red-500">{errors.descripcion?.message}</p>
        )}
      </div>

      {/* FECHA DE VENCIMIENTO */}
      <div className="flex flex-col items-start gap-4 my-4 w-full">
        <p>Fecha de vencimiento (opcional)</p>
        <Controller
          name="fecha_vencimiento"
          control={control}
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
        {errors.fecha_vencimiento && (
          <p className="ml-1 text-red-500">
            {errors.fecha_vencimiento.message}
          </p>
        )}
      </div>

      {/* REFERENCIAS EN URL E IMAGEN PREVISUALIZADA */}
      <div className="flex flex-col items-start gap-4 mb-2">
        <p>Referencias en url (opcional)</p>
        {errors.referencias && (
          <p className="ml-1 text-red-500">{errors.referencias.message}</p>
        )}
        <div className="flex flex-wrap justify-center gap-4 w-full h-fit">
          {imgReferencias?.map((_, index) => (
            <Controller
              key={index}
              name={`referencias.${index}`}
              control={control}
              render={({ field: { value } }) => (
                <ButtonImage
                  action={() =>
                    setModal(
                      true,
                      "Ingresar URL",
                      <ModalBodyUpdateUrl key={index} value={value} />,
                    )
                  }
                >
                  <ImageUrlPreview url={value} />
                </ButtonImage>
              )}
            />
          ))}
          {(imgReferencias?.length ?? 0) < 5 && (
            <ButtonImage
              action={() => setImgReferencias([...(imgReferencias ?? []), ""])}
            >
              <Plus className="size-10" />
            </ButtonImage>
          )}
        </div>
      </div>

      {/* BOTÓN PARA AGREGAR */}
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleSubmit(onSubmit)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
