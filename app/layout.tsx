import type React from "react"
import type { Metadata } from "next"
import { Buenard as Pretendard } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const pretendard = Pretendard({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pretendard",
})

export const metadata: Metadata = {
  title: "국제거래소 B2B 사이트",
  description: "국제거래소 B2B 웹사이트",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
