import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackbear.agency"),
  title: "Black Bear Tech | We Solve Your Business Problems With Technology",
  description: "Enterprise tech solutions across the Middle East and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
