import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senate Mashinani | Parliament of Kenya",
  metadataBase: new URL("http://localhost:3000"),
  description:
    "The Kenya Senate Mashinani Initiative — decentralized democracy, bringing Parliament to the people across Kenya's 47 counties.",
  keywords: "Kenya Senate, Mashinani, Parliament, Devolution, Counties, Democracy",
  icons: {
    icon: "/senate_mashinani.png",
    apple: "/senate_mashinani.png",
  },
  openGraph: {
    title: "Senate Mashinani | Parliament of Kenya",
    description:
      "The Kenya Senate Mashinani Initiative — decentralized democracy, bringing Parliament to the people across Kenya's 47 counties.",
    images: [{ url: "/senate_mashinani.png", width: 1200, height: 630, alt: "Senate Mashinani" }],
    type: "website",
    locale: "en_KE",
    siteName: "Senate Mashinani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senate Mashinani | Parliament of Kenya",
    description:
      "The Kenya Senate Mashinani Initiative — decentralized democracy, bringing Parliament to the people across Kenya's 47 counties.",
    images: ["/senate_mashinani.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="pt-[68px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
