import BlockBack from "@/components/shared/blockBack/BlockBack";
import { MainContainer } from "@/components/shared/MainContainer";
import { SignInContent } from "@/content/sign-in/SignInContent";

export default function SignIn() {
  return (
    <MainContainer>
      <SignInContent />
      <BlockBack />
    </MainContainer>
  );
}
