import type { Metadata } from "next"
import { Merriweather } from "next/font/google"
import "./globals.css"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Challenge Calendar",
  description: "Track your daily challenges and activities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={merriweather.className}>
      <body className="bg-grey-50 text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
