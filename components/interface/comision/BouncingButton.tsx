"use client";

import { motion } from "framer-motion";

export function BouncingButton({
  children,
  action,
  widthTailwind,
  heightTailwind,
  backgroundColorRgba,
  backgroundColorHoverRgba,
  pxTailwind,
  pyTailwind,
}: {
  children: React.ReactNode;
  action: () => void;
  widthTailwind: string;
  heightTailwind: string;
  backgroundColorRgba: string;
  backgroundColorHoverRgba: string;
  pxTailwind: string;
  pyTailwind: string;
}) {
  return (
    <motion.button
      className={`flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-100 cursor-pointer ${widthTailwind} ${heightTailwind} ${pxTailwind} ${pyTailwind}`}
      whileHover={{
        scale: 1.05,
        backgroundColor:
          backgroundColorHoverRgba /* "rgba(15, 23, 42, 0.7)", */,
      }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        backgroundColor: { duration: 0.3 },
      }}
      style={{
        backgroundColor: backgroundColorRgba /* "rgba(15, 23, 42, 0)" */,
      }}
      onClick={action}
    >
      {children}
    </motion.button>
  );
}
