import pirita from "@/images/home/us.png";
import Image from "next/image";
import { DynamicText } from "./DynamicText";

export function PresentationImage() {
  return (
    <article className="relative w-full h-dvh overflow-hidden">
      {/* GRADIENTE NEGRO DE ARRIBA A ABAJO */}
      <div className="absolute top-0 left-0 z-30 w-full h-full bg-linear-to-b from-black/60 to-transparent">
        <DynamicText />
      </div>

      {/* IMAGEN DE FONDO */}
      <Image
        src={pirita}
        alt="pirita"
        fill
        unoptimized
        preload
        className="object-cover object-center"
      />
    </article>
  );
}
