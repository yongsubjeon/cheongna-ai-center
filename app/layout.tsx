import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "청라에너지 산업맞춤형 혁신바우처 AI 교육",
  description: "AI 혁신기업,청라에너지",
  generator: "v0.dev",
  openGraph: {
    title: "청라에너지 AI교육",
    description: "AI 혁신기업,청라에너지",
    url: "https://cheongna.vercel.app/",
    type: "website",
    images: [
      {
        url: "/images/cheongna-energy-logo.png",
        width: 400,
        height: 200,
        alt: "청라에너지 X 도슨티 AI 교육",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
