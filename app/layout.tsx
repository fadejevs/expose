import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://expose.so"),
  title: "Expose - Get Real Travel Prices",
  description:
    "Upload any travel photo and expose the real cost in seconds. Stop getting ripped off by Instagram posts. See flights, hotels, food, and hidden fees.",
  keywords:
    "travel pricing, vacation cost calculator, real travel prices, Instagram travel reality, travel budget, vacation planning, travel expenses, flight prices, hotel costs, travel budgeting tool, expose travel costs",
  openGraph: {
    type: "website",
    url: "https://expose.so",
    title: "Expose - Get Real Travel Prices",
    description:
      "Upload any travel photo and expose the real cost in seconds. Stop getting ripped off by Instagram posts.",
    images: [
      {
        url: "https://expose.so/images/cover.png",
        width: 1200,
        height: 800,
        alt: "Expose - Real Travel Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@exposeapp",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <body className={``}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E3QDH43RQB"
          strategy="afterInteractive"
        />

        <Script strategy="afterInteractive" id="google-analytics">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-E3QDH43RQB');
  `}
        </Script>
        <Navbar />
        <div style={{ minHeight: '70vh' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
