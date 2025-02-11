import type { Metadata } from "next"
import { Noto_Serif_Display, Lora } from "next/font/google"
import "./globals.css"

const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  variable: "--font-noto-serif-display",
})

const lora = Lora({
  subsets: ["latin"],
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
      <head>
        <link 
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css" 
          rel="stylesheet"
        />
      </head>
      <body className="bg-grey-50 text-foreground antialiased font-lora">
        {children}
      </body>
    </html>
  )
}
