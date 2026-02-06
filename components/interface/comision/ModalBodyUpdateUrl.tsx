"use client";

import { useFormContext } from "react-hook-form";
import { ImageUrlPreview } from "./ImageUrlPreview";
import { FormValues } from "./ComisionFormChildren";

export function ModalBodyUpdateUrl({ index }: { index: number }) {
  const { setValue, watch } = useFormContext<FormValues>();

  const value = watch(`referencias.${index}.url`);

  return (
    <div className="w-full max-h-72 h-fit overflow-y-auto md:overflow-y-hidden flex gap-4 flex-col md:flex-row scrollbar-custom">
      <div className="md:w-1/2 h-60 max-h-60">
        <textarea
          value={value ?? ""}
          onChange={(e) =>
            setValue(`referencias.${index}.url`, e.target.value, {
              shouldDirty: true,
              shouldTouch: true,
            })
          }
          placeholder="https://example.com/img.png"
          className="w-full h-full px-4 rounded-xl border-2 border-neutral-100 py-2 outline-none resize-none hover:bg-slate-800 transition-all duration-300"
        />
      </div>
      <div className="w-full md:w-1/2 h-60 max-h-60 rounded-xl bg-slate-800/50">
        <ImageUrlPreview url={value ?? ""} rounded />
      </div>
    </div>
  );
}
