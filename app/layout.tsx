import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const mono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-loaded",
});

export const metadata: Metadata = {
  title: "harshith mente",
  description:
    "software engineer. typescript, c++, python. compliance infra at flagright. f1, barça, rcb. always building.",
  openGraph: {
    title: "harshith mente",
    description:
      "software engineer. typescript, c++, python. compliance infra at flagright.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mono.variable}>
      <body>{children}</body>
    </html>
  );
}
