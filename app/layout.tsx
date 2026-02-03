import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "garibcatastrofe",
  description:
    "garibcatastrofe es un artista cuya meta es llenar al mundo de dibujos que reflejen las emociones de la gente mediante personajes multifaceticos y llenos de amor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} ${lora.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
