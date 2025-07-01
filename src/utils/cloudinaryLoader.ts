// utils/cloudinaryLoader.ts
export function cloudinaryLoader({ src, width, quality }: {
    src: string;
    width: number;
    quality?: number;
  }) {
    // Add f_auto for automatic format selection, and cache control parameters
    // fl_immutable indicates the image won't change, allowing longer client-side caching
    // fl_progressive for progressive loading of images
    return `https://res.cloudinary.com/dppbxvjbg/image/upload/f_auto,q_${quality || 75},w_${width},fl_immutable,fl_progressive/${src}`;
  }
  