import type { Metadata } from "next";
import type React from "react";
import "../../app/globals.css"

export const metadata: Metadata = {
  title: "Urdu Search The Sahaba: SearchAyah",
  description:
    "Search any Sahaba using the search bar and get redirected to their respective Wikipedia pages by name.",
  keywords: ["Sahaba", "Islamic companions", "SearchAyah"],
};

export default function SahabaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <>{children}</> 
  );
}