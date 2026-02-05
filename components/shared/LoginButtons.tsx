import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Suspense } from "react";

export function LoginButtons({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SignedOut>
        <div className="flex gap-4 text-white">
          <SignInButton>
            <button className="px-4 py-2 border rounded-xl border-slate-400 hover:bg-slate-800/50 transition-all duration-300 hover:border-slate-600 cursor-pointer">
              Ingresar
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 border border-transparent rounded-xl bg-green-600 hover:bg-green-500 transition-all duration-300 cursor-pointer">
              Registrarse
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </Suspense>
  );
}
