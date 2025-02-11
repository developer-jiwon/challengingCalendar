import type { Metadata } from "next"
import { Noto_Serif_Display, Lora } from "next/font/google"
import "./globals.css"

const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
})

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Challenge Calendar",
  description: "Track your daily challenges and build better habits",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSerifDisplay.variable} ${lora.variable}`}>
      <body className="bg-grey-50 text-foreground antialiased font-lora">
        {children}
      </body>
    </html>
  )
}
