import type { Metadata } from "next";
import { Archivo, Orbitron } from "next/font/google";
import "./globals.css";

const archivoSans = Archivo({
  variable: "--font-archivo-sans",
  subsets: ['latin'],
})

const orbitorn = Orbitron({
  weight: '700',
  variable: "--font-orbitron",
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Insecure Bank",
  description: "A deliberately insecure bank.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoSans.variable} ${orbitorn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
