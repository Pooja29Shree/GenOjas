import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gen Ojas",
  description: "The goto Productivity and Mental Healthcare app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased light`}
      >
        {children}
      </body>
    </html>
  );
}
