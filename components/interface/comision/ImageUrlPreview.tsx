"use client";

import { useEffect, useState, useCallback } from "react";
import { Image as Imagensita } from "lucide-react";

type ImageUrlPreviewProps = {
  url?: string;
  rounded: boolean;
};

export function ImageUrlPreview({ url, rounded }: ImageUrlPreviewProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const isAbsoluteHttpsUrl = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const validateUrl = useCallback((value: string | null) => {
    if (!value) return null;
    return isAbsoluteHttpsUrl(value);
  }, []);

  useEffect(() => {
    if (!url) return;

    const isValid = validateUrl(url);

    if (!isValid) return;

    let cancelled = false;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      if (!cancelled) setIsValid(true);
    };

    img.onerror = () => {
      if (!cancelled) setIsValid(false);
    };

    return () => {
      cancelled = true;
    };
  }, [url, validateUrl]);

  return !url || isValid !== true ? (
    <div className="w-full h-full flex items-center justify-center">
      <Imagensita className="size-10" />
    </div>
  ) : (
    <picture className={`w-full h-full ${rounded ? "rounded-xl" : "rounded-none"}`}>
      <img
        src={url}
        alt="preview"
        className={`w-full h-full object-cover object-center ${rounded ? "rounded-xl" : "rounded-none"}`}
      />
    </picture>
  );
}
