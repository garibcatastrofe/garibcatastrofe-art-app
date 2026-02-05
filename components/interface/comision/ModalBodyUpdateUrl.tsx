"use client";

export function ModalBodyUpdateUrl({ value }: { value: string }) {
  return (
    <div className="w-full h-fit p-4">
      <p className="mb-2">URL</p>
      <input
        type="text"
        value={value}
        placeholder="https://example.com/img.png"
        className="w-full px-4 rounded-xl border-2 border-neutral-100"
      />
    </div>
  );
}
