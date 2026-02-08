export function PresentationImage({ children }: { children: React.ReactNode }) {
  return (
    <article className="relative w-full h-[calc(75dvh)] overflow-hidden">
      {children}
    </article>
  );
}
