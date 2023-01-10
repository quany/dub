import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Script from 'next/script'
import "@/styles/globals.css";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";

const satoshi = localFont({
  src: "../styles/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <main className={cx(satoshi.variable, inter.variable)}>
        <Component {...pageProps} />
      </main>
      <Analytics />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3081175603682487" crossorigin="anonymous"></Script>
    </SessionProvider>
  );
}

export default MyApp;
