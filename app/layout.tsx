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
    "harshith mente, software engineer from vizag, based in bengaluru. typescript, c++, python. compliance infra at flagright. f1, barça, rcb. always building something fun.",
  openGraph: {
    title: "harshith mente · software engineer",
    description:
      "software engineer from vizag, based in bengaluru. building something fun at flagright.",
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
