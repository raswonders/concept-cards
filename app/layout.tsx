import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Baloo_2 } from "@next/font/google";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo2",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} font-baloo2 antialiased`}
      >
        <div className="min-h-screen flex justify-center overflow-x-hidden">   
          {children}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <Image
              className="absolute top-20 right-0 rotate-12 opacity-10"
              src={`/images/red-exclamation-mark.svg`}
              width={240}
              height={240}
              alt="red exclamation mark"
            />
            <Image
              className="absolute top-40 right-20 -rotate-12 opacity-15"
              src={`/images/green-exclamation-mark.svg`}
              width={240}
              height={240}
              alt="blue exclamation mark"
            />
            <Image
              className="absolute bottom-40 left-28 rotate-12 opacity-15"
              src={`/images/blue-exclamation-mark.svg`}
              width={360}
              height={360}
              alt="green exclamation mark"
            />
            <Image
              className="absolute top-1/4 -rotate-12 -translate-x-32 opacity-25"
              src={`/images/white-question-mark.svg`}
              width={360}
              height={360}
              alt="white question mark"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
