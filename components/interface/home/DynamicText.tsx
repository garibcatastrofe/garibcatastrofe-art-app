"use client";

import { useEffect, useState } from "react";
import { texts } from "@/data/interface/dynamicText";

export function DynamicText() {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100; // Velocidad: más rápido al borrar
    const fullText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000); // Espera antes de borrar
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Parpadeo del cursor cada 0.5s

    return () => clearInterval(cursorInterval);
  }, []);
  return (
    <div className="absolute z-40 flex flex-col gap-4 bottom-10 left-10">
      <h2 className="mr-10 font-bold text-white text-7xl">Hola, soy</h2>
      <div className="flex">
        <p className="font-bold text-white text-7xl">{currentText}</p>
        <span
          className={`text-white text-7xl font-bold ${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          _
        </span>
      </div>
    </div>
  );
}
