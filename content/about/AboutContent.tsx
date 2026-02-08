import { ImageText } from "@/components/interface/about/ImageText";
import me from "@/images/about/me1.png";

export function AboutContent() {
  return (
    <section className="w-full h-dvh flex items-center">
      <ImageText
        alt={"garibcatastrofe"}
        image={me}
        text="garibcatastrofe es un artista cuya meta es llenar al mundo de
              dibujos que reflejen las emociones de la gente mediante personajes
              multifaceticos y llenos de amor"
        title="Sobre mí"
      />
    </section>
  );
}
