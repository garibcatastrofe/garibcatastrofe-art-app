"use client";

import { useUser, useAuth } from "@clerk/nextjs";
/* import Image from "next/image"; */
import { motion } from "framer-motion";
import { useState } from "react";
import { LogOut, UserRound } from "lucide-react";
import { useAnnouncement } from "@/stores/announcementStore";

export function CustomUserButton() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setAnnouncement } = useAnnouncement();

  const toogleOpen = () => {
    setOpen(!open);
  };

  const logout = () => {
    setAnnouncement(
      true,
      "bg-green-700",
      <p className="text-white">
        Sesión cerrada correctamente, redirigiendo al index...
      </p>,
    );

    signOut({ redirectUrl: "/" });
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <motion.div
        className="flex items-center rounded-full gap-2 px-4 py-2 hover:bg-green-600 bg-green-700 transition-all duration-300 cursor-pointer relative"
        onClick={toogleOpen}
      >
        {/* <Image
          src={user.imageUrl}
          alt="avatar"
          width={32}
          height={32}
          className="w-7 h-7 rounded-full"
        /> */}
        <UserRound className="size-4 text-white" />
        <span className="text-white">{user.firstName}</span>
        {/* dropdown */}
        <motion.div
          className={`absolute right-0 -bottom-18 z-60 mt-2 w-48 rounded-xl bg-slate-800 shadow-xl border border-slate-700 p-2 ${open ? "" : "pointer-events-none"}`}
          animate={{ opacity: open ? 1 : 0, y: open ? [5, -1, 0] : 5 }}
        >
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded-xl text-red-500 hover:bg-slate-700 flex items-center gap-2 justify-center cursor-pointer"
          >
            <LogOut className="size-4" />
            <span>Cerrar sesión</span>
          </button>
        </motion.div>
      </motion.div>
      {open && (
        <div
          className="absolute top-0 left-0 w-full z-50 h-dvh max-h-dvh max-w-dvw"
          onClick={toogleOpen}
        />
      )}
    </motion.div>
  );
}
