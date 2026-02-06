import { PresentationImage } from "@/components/interface/home/PresentationImage";
import { ParticlesShapes } from "@/components/shared/particles/ParticlesShapes";

export function HomeContent() {
  return (
    <section className="w-full h-fit">
      <PresentationImage />
      <div className="w-full h-dvh relative flex items-center justify-center">
        <ParticlesShapes
          idContainer="particulasHome"
          backColor="#000000"
          particleColor="#005907"
        />
        <div className="z-50">
          <p className="text-white">Aquí va el contenido</p>
        </div>
      </div>
    </section>
  );
}
