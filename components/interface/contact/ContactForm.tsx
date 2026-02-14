import { ContactFormChildren } from "./ContactFormChildren";

export function ContactForm() {
  return (
    <div className="flex justify-center items-center w-full g-fit flex-col z-10 pt-24">
      <h1 className="pb-2">Para más información</h1>
      <h2
        style={{ fontFamily: "var(--font-poppins)" }}
        className="text-3xl font-medium mb-4"
      >
        Ponte en contacto
      </h2>

      <ContactFormChildren />
    </div>
  );
}
