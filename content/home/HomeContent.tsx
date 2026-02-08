import { ImageText } from "@/components/interface/about/ImageText";
import { DynamicText } from "@/components/interface/home/DynamicText";
import { PresentationImage } from "@/components/interface/home/PresentationImage";
import { ParticlesShapes } from "@/components/shared/particles/ParticlesShapes";
import nature from "@/images/home/Nature.png";
import lilith from "@/images/home/lilithjorge.png";
import Image from "next/image";

export function HomeContent() {
  return (
    <section className="w-full h-fit">
      <PresentationImage>
        {/* GRADIENTE NEGRO DE ARRIBA A ABAJO */}
        <div className="absolute top-0 left-0 z-30 w-full h-full bg-linear-to-b from-black/90 to-transparent">
          <DynamicText />
        </div>
        {/* IMAGEN DE FONDO */}
        <Image
          src={nature}
          alt="nature"
          unoptimized
          preload
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute top-0 left-0 z-20 w-full h-full bg-linear-to-t from-black/20 to-transparent"></div>
      </PresentationImage>
      <div className="w-full lg:h-[calc(25dvh)] h-fit py-20 lg:py-0 relative flex items-center justify-center">
        <ParticlesShapes
          idContainer="particulasHome"
          backColor="#000000"
          particleColor="#0EA114"
        />
        <div className="z-40">
          <h1 className="text-white lg:text-6xl text-2xl">
            <span style={{ fontFamily: "var(--font-poppins)" }} className="">
              Arte, conversación y
            </span>{" "}
            <span className="font-semibold italic">mundos de fantasía</span>
          </h1>
        </div>
      </div>
      <PresentationImage>
        {/* IMAGEN DE FONDO */}
        <Image
          src={lilith}
          alt="lilith"
          unoptimized
          preload
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute top-0 left-0 z-20 p-20 w-full h-full bg-linear-to-t from-black/50 to-transparent flex items-end justify-end flex-col">
          <h1
            className="text-7xl font-bold"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Mi estilo
          </h1>
          <p
            style={{ fontFamily: "var(--font-lora)" }}
            className="text-4xl font-bold"
          >
            Tengo un estilo cartoon, con un lineart definido y con colores
            llamativos
          </p>
        </div>
      </PresentationImage>
    </section>
  );
}
