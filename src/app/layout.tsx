import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Bear Tech",
  description: "Enterprise tech solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
