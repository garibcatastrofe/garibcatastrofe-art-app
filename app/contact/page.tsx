import BlockBack from "@/components/shared/blockBack/BlockBack";
import { MainContainer } from "@/components/shared/MainContainer";
import { ContactContent } from "@/content/contact/ContactContent";

export default function Contact() {
  return (
    <MainContainer>
      <ContactContent />
      <BlockBack />
    </MainContainer>
  );
}
