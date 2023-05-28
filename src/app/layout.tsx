import "./globals.css";
import { Inter } from "next/font/google";
import clsx from "clsx";
import Header from "@/components/header";
import Providers from "@/components/providers";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub Repositories Explorer  |  Fadhil Darma Putera Zagoto ",
  description: "Website to show off my porofolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body className={clsx(inter.className, "scroll-smooth")}>
        <Providers>
          <Header />
          <main className="relative mx-auto mb-16 max-w-7xl px-8 py-24 min-h-[99vh] dark:text-white/90 ">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
