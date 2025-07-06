import { cloudinaryLoader } from '@/utils/cloudinaryLoader'

/**
 * Optimize the book cover image URL
 * 
 * @param imageUrl The original image URL
 * @param options Image optimization options
 * @returns Optimized image URL
 */
export const optimizeBookCover = (imageUrl: string, options: { width?: number, height?: number, quality?: number } = {}) => {
  const { width = 400, height = 600, quality = 80 } = options
  
  // Check if it's a Cloudinary URL
  if (imageUrl.includes('cloudinary.com')) {
    // Extract the Cloudinary path
    const cloudinaryPath = imageUrl.replace("https://res.cloudinary.com/dppbxvjbg/image/upload/", "")
    
    // Use the Cloudinary loader with transformation params
    return cloudinaryLoader({
      src: cloudinaryPath,
      width,
      quality
    })
  }
  
  // For local images, add width and quality parameters if possible
  if (imageUrl.startsWith('/')) {
    // This is a local image, can't transform it directly
    return imageUrl
  }
  
  // For other external images, return as is
  return imageUrl
}

/**
 * Generate proper image sizes attribute for responsive images
 */
export const getResponsiveImageSizes = () => {
  return "(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
}

/**
 * Calculate the approximate aspect ratio for book covers
 * Most Islamic book covers follow a standard height/width ratio
 */
export const getBookCoverAspectRatio = () => {
  // Standard book cover aspect ratio (height/width)
  return 1.6 // Approximately 8:5 ratio
}
