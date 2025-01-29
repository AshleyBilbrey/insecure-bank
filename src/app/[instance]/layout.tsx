import type { Metadata } from "next";
import { Archivo, Orbitron } from "next/font/google";
import "../globals.css";
import Header from "../../components/header";

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
  title: "Arasaka Financial Services",
  description: "Your eurodollars are safe with us.™",
};

export default async function BankLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ instance: string }>
}>) {
  const instance = (await params).instance;

  return (
    <html lang="en">
      <body
        className={`${archivoSans.variable} ${orbitorn.variable} antialiased`}
      >
        <Header instance={instance} />
        {children}
      </body>
    </html>
  );
}
