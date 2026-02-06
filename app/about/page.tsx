import BlockBack from "@/components/shared/blockBack/BlockBack";
import { MainContainer } from "@/components/shared/MainContainer";
import { AboutContent } from "@/content/about/AboutContent";

export default function About() {
  return (
    <MainContainer>
      <AboutContent />
      <BlockBack />
    </MainContainer>
  );
}
