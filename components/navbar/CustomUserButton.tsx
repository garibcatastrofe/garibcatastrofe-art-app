"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function CustomUserButton() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <motion.div
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        className="flex items-center relative rounded-full gap-4 px-4 py-2 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
      >
        <Image
          src={user.imageUrl}
          alt="avatar"
          width={32}
          height={32}
          className="w-7 h-7 rounded-full"
        />
        <span className="text-white">{user.firstName}</span>

        {/* dropdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0, y: open ? [5, -1, 0] : 5 }}
          className="absolute right-0 -bottom-18 z-60 pt-8"
        >
          <div
            className={`w-48 rounded-xl bg-slate-800 shadow-xl border border-slate-700 p-2`}
          >
            <button
              onClick={() => signOut()}
              className="w-full px-4 py-2 rounded-xl text-red-500 hover:bg-slate-700 flex items-center gap-2 justify-center cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
