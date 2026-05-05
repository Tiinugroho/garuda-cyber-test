import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garuda Cyber App",
  description: "Technical Test for PT Garuda Cyber Indonesia[cite: 1]",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      {/* Jangan beri class pembatasan apapun di body ini */}
      <body>{children}</body>
    </html>
  );
}