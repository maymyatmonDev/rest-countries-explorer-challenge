import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "../styles/globals.css";
import Providers from "./provider";
import { Navbar } from "@/components/Navbar";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rest countries api with color theme switcher",
  description:
    "Frontend Mentor Challenge Solution By May_M3 - REST Countries API with Color Theme Switcher",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}