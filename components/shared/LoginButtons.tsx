import {
  SignedIn,
  SignedOut /* SignInButton, SignUpButton */,
} from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export function LoginButtons({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SignedOut>
        <div className="flex gap-4 text-white">
          <Link
            href={"/sign-in"}
            className="px-4 py-2 border rounded-xl border-slate-400 hover:bg-slate-800/50 transition-all duration-300 hover:border-slate-600 cursor-pointer"
          >
            Ingresar
          </Link>
          <Link
            href={"/sign-up"}
            className="px-4 py-2 border border-transparent rounded-xl bg-green-600 hover:bg-green-500 transition-all duration-300 cursor-pointer"
          >
            Registrarse
          </Link>
        </div>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </Suspense>
  );
}
