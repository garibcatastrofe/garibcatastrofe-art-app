import pirita from "@/images/home/Nature.png";
import Image from "next/image";
import { DynamicText } from "./DynamicText";

export function PresentationImage() {
  return (
    <article className="relative w-full h-[calc(50dvh)] overflow-hidden">
      {/* GRADIENTE NEGRO DE ARRIBA A ABAJO */}
      <div className="absolute top-0 left-0 z-30 w-full h-full bg-linear-to-b from-black/90 to-transparent">
        <DynamicText />
      </div>

      {/* IMAGEN DE FONDO */}
      <Image
        src={pirita}
        alt="pirita"
        unoptimized
        preload
        className="object-cover object-center w-full h-full"
      />

      <div className="absolute top-0 left-0 z-20 w-full h-full bg-linear-to-t from-black/20 to-transparent"></div>
    </article>
  );
}
