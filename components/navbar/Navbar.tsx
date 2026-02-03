"use client";

import { useEffect, useState } from "react";
import { socialMediaButtons } from "@/data/navbar/socialMediaButtons";
import { links } from "@/data/navbar/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Suspense } from "react";
import { CustomUserButton } from "./CustomUserButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(`${path}/`);

    return `${isActive ? "text-green-600 bg-green-600/20" : "hover:bg-slate-800/50 transition-all duration-300"}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      // Cambia a true cuando el scroll pasa cierto punto
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza del evento
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      style={
        scrolled
          ? { backdropFilter: "blur(3px)" }
          : { backdropFilter: "blur(0px)" }
      }
      className={`fixed top-0 left-0 z-50 items-center flex transition-all duration-300 justify-between w-full px-10 ${
        scrolled ? "bg-slate-950/70 shadow-md h-16" : "bg-transparent h-24"
      }`}
    >
      <div className="flex items-center h-full gap-4 w-fit">
        {socialMediaButtons.map((butt, i) => (
          <a key={i} href={butt.link} target="_blank" rel="noopener noreferrer">
            <butt.Icon width={20} height={20} fill="#ffffff" />
          </a>
        ))}
      </div>

      <div className="flex gap-4 text-white">
        {links.map((link, i) => (
          <Link
            className={`${linkClasses(link.href)} rounded-full py-2 px-4`}
            key={i}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>

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
        <SignedIn>
          <CustomUserButton />
        </SignedIn>
      </Suspense>
    </nav>
  );
}
