import BlockBack from "@/components/shared/blockBack/BlockBack";
import { MainContainer } from "@/components/shared/MainContainer";
import { SignUpContent } from "@/content/sign-up/SignUpContent";

export default function SignUp() {
  return (
    <MainContainer>
      <SignUpContent />
      <BlockBack />
    </MainContainer>
  );
}
