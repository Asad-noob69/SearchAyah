import type { Metadata } from "next"
import "./globals.css"
import { myFont } from '../lib/font';
import type React from "react" // Import React

export const metadata: Metadata = {
  title: "SearchAyah | Sahaba Names",
  description: "List of Sahaba names in English and Urdu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body className="min-h-screen flex flex-col bg-[url('/images/bg2.png')] bg-cover bg-no-repeat bg-center bg-fixed">
        {children}
      </body>
    </html>
  )
}

