import { PresentationImage } from "@/components/interface/home/PresentationImage";
import { ParticlesShapes } from "@/components/shared/particles/ParticlesShapes";

export function HomeContent() {
  return (
    <section className="w-full h-fit">
      <PresentationImage />
      <div className="w-full h-[calc(50dvh)] relative flex items-center justify-center">
        <ParticlesShapes
          idContainer="particulasHome"
          backColor="#000000"
          particleColor="#0EA114"
        />
        <div className="z-50">
          <h1 className="text-white text-7xl">Arte, conversación y mundos de fantasía</h1>
        </div>
      </div>
    </section>
  );
}
