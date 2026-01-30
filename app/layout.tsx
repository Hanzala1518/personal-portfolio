import "./globals.css"
import "@/styles/animations.css"

import type { Metadata, Viewport } from "next"
import { Fira_Code as FiraCode, Inter } from "next/font/google"

import Providers from "@/components/shared/Providers"
import { cn } from "@/lib/utils/cn"
import siteConfig from "@/config/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const fira = FiraCode({ subsets: ["latin"], variable: "--font-fira", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.shortName
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  },
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.author.handle
  }
}

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  colorScheme: "dark"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable, fira.variable)}>
      <body className="min-h-screen bg-matrix-black text-matrix-grey">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
