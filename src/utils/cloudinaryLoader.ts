// utils/cloudinaryLoader.ts
export function cloudinaryLoader({ src, width, quality }: {
    src: string;
    width: number;
    quality?: number;
  }) {
    return `https://res.cloudinary.com/dppbxvjbg/image/upload/w_${width},q_${quality || 75}/${src}`;
  }
  