import type { Metadata } from "next";
import type React from "react";
import "../../app/globals.css"; // Adjust path if needed

export const metadata: Metadata = {
  title: "Islamic Books: SearchAyah",
  description: "Discover a collection of Islamic books and resources on SearchAyah.",
  keywords: ["Islamic books, Quran, Hadith, buy Islamic books, Islamic bookstore, Sahih Bukhari, Islamic history books, Islamic studies"],
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}