import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script" // 1. Script 컴포넌트 임포트
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CPS 계정 연동 관리 - MOBON Admin",
  description: "CPS 계정 연동 관리 시스템",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  <html lang="ko">
      <body className={`font-sans antialiased`}>
        {/* 2. Onetag TCS 스크립트 삽입 */}
        <Script 
          src="https://cdn.onetag.co.kr/0/tcs.js?eid=r1a0o4fl4egmr1a0o4fl4e" 
          strategy="afterInteractive" 
        />
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}
