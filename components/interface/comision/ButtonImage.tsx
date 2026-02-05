"use client";

import { motion } from "framer-motion";

export function ButtonImage({
  children,
  action,
}: {
  children: React.ReactNode;
  action: () => void;
}) {
  return (
    <motion.div
      className="flex items-center justify-center w-32 h-32 rounded-xl border-2 border-neutral-100 cursor-pointer"
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(15, 23, 42, 0.7)",
      }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        backgroundColor: { duration: 0.3 },
      }}
      onClick={action}
    >
      {children}
    </motion.div>
  );
}
