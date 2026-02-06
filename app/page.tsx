import BlockBack from "@/components/shared/blockBack/BlockBack";
import { MainContainer } from "@/components/shared/MainContainer";
import { HomeContent } from "@/content/home/HomeContent";

export default function Home() {
  return (
    <MainContainer>
      <HomeContent />
      <BlockBack />
    </MainContainer>
  );
}
