import React from "react"
import Image from "next/image"
import Link from "next/link"
import { cloudinaryLoader } from "@/utils/cloudinaryLoader"
import { optimizeBookCover, getResponsiveImageSizes } from "@/utils/imageOptimization"

interface BookCoverProps {
  book: {
    id: string
    title: string
    slug?: string
    coverImage: string
  }
  baseUrl: string
  width?: number
  height?: number
  priority?: boolean
  hoverEffect?: boolean
  className?: string
}

export default function BookCover({
  book,
  baseUrl,
  width = 160,
  height = 240,
  priority = false,
  hoverEffect = true,
  className = ""
}: BookCoverProps) {
  // Handle the image path correctly
  const imageUrl = book.coverImage.includes('cloudinary.com')
    ? book.coverImage.replace("https://res.cloudinary.com/dppbxvjbg/image/upload/", "")
    : book.coverImage

  // Use slug if available, otherwise use ID
  const bookLink = `${baseUrl}/${book.slug || book.id}`

  return (
    <Link 
      href={bookLink} 
      className={`relative block ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        loader={cloudinaryLoader}
        src={imageUrl}
        alt={`Cover image of ${book.title}`}
        fill
        sizes={getResponsiveImageSizes()}
        className={`object-contain rounded ${hoverEffect ? 'hover:-translate-y-2 transition duration-200' : ''}`}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        quality={85}
      />
    </Link>
  )
}
