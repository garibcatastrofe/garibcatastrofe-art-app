import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t-2 border-neutral-100 z-60 w-full h-80 flex text-white justify-center items-center p-4 flex-col gap-2">
      <div className="flex-1 flex items-center">
        <p className="font-medium text-2xl">Garibcatastrofe Art App</p>
      </div>
      <div className="flex items-center gap-1 w-full justify-center border-t-2 border-neutral-800 pt-4">
        <Copyright className="size-4" />
        <p>Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
