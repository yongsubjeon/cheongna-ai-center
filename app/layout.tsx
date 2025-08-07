import type React from "react"
import type { Metadata } from "next"
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
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          html {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
        `}</style>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
