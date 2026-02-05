import { LoginButtons } from "@/components/shared/LoginButtons";
import { ComisionFormChildren } from "@/components/interface/comision/ComisionFormChildren";

export function ComisionForm() {
  return (
    <div className="flex justify-center items-center w-full h-fit flex-col z-10 pt-24">
      <h1 className="pb-2">¿Deseas una ilustración?</h1>
      <h2
        style={{ fontFamily: "var(--font-poppins)" }}
        className="text-3xl font-medium mb-4"
      >
        Ponte en contacto
      </h2>

      <LoginButtons>
        <ComisionFormChildren />
      </LoginButtons>
    </div>
  );
}
