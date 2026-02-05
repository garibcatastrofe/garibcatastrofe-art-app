"use client";

import { useEffect, useState } from "react";
import { socialMediaButtons } from "@/data/navbar/socialMediaButtons";
import { links } from "@/data/navbar/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomUserButton } from "./CustomUserButton";
import { LoginButtons } from "../LoginButtons";

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
          ? { backdropFilter: "blur(5px)" }
          : { backdropFilter: "blur(0px)" }
      }
      className={`fixed top-0 left-0 z-50 items-center flex transition-all duration-300 justify-between w-full px-10 ${
        scrolled ? "bg-slate-950/70 shadow-md h-16" : "bg-transparent h-24"
      }`}
    >
      <div className="flex items-center h-full gap-4 w-fit">
        {socialMediaButtons.map((butt, i) => (
          <a
            key={i}
            href={butt.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-slate-800/50 transition-all duration-300 rounded-xl p-2"
          >
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

      <LoginButtons>
        <CustomUserButton />
      </LoginButtons>
    </nav>
  );
}
