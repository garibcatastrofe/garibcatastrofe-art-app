"use client";

import { X } from "lucide-react";
import { useModal } from "@/stores/modalStore";
import { motion } from "framer-motion";

export function Modal() {
  const { isActivated, setModal, modalTitle, modalBody } = useModal();

  const hacerModalFalso = () => {
    setModal(false, modalTitle ?? "", modalBody);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-70 flex items-center justify-center w-full h-dvh ${
        isActivated ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Modal Blanco con animación de rebote */}
      <motion.div
        className="z-70 p-6 bg-slate-950 border-2 border-neutral-100 rounded-lg shadow-lg lg:w-150 md:w-125 w-[calc(100%-2rem)]"
        initial={{ opacity: 0, y: 30 }} // Comienza un poco abajo
        animate={{
          opacity: isActivated ? 1 : 0,
          y: isActivated ? [30, -10, 0] : 30, // Rebote de arriba a abajo
        }}
        exit={{ opacity: 0, y: 30 }}
        transition={{
          duration: 0.4, // Duración más larga para permitir el rebote
          type: "tween",
          stiffness: 200, // Controla la rigidez de la animación
          damping: 25, // Controla el rebote
        }}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)", // Esto centra el modal
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl font-medium"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {modalTitle}
          </h2>
          <X
            onClick={hacerModalFalso}
            className="size-5 text-gray-600 cursor-pointer"
          />
        </div>
        <div className="w-full h-auto">{modalBody}</div>
      </motion.div>

      {/* Fondo negro con animación */}
      <motion.div
        className={`absolute top-0 left-0 w-full h-full bg-black/50 z-60`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActivated ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: "blur(1px)",
          pointerEvents: isActivated ? "auto" : "none",
        }}
        onClick={hacerModalFalso}
      ></motion.div>
    </div>
  );
}
