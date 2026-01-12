import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "itsvngo - Personal Portfolio & Knowledge Platform",
  description: "Personal portfolio, blog, and knowledge platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
