export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-slate-950 text-white">
      {children}
    </main>
  );
}
