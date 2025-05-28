import type { Metadata } from "next"
import "./globals.css"
import type React from "react" 

export const metadata: Metadata = {
  title: "SearchAyah | Quran, Hadith, Sahaba",
  description: "SearchAyah Quickly find Quranic ayahs, hadiths, and Sahaba names. Efficient access to Islamic texts using simple search queries. Explore the Quran, hadith collections, and learn about the companions of Prophet Muhammad.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className="min-h-screen flex flex-col bg-[url('/images/bg2.webp')] bg-cover bg-no-repeat bg-center bg-fixed">
        {children}
      </body>
    </html>
  )
}

