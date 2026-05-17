import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syncro | Team Task Manager",
  description: "Manage projects and tasks with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className="dark" suppressHydrationWarning>
=======
    <html lang="en" className="dark">
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
