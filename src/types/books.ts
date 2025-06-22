export interface Volume {
    volumeNumber: number;
    downloadUrl: string;
  }
  
  export interface Book {
    _id?: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    volumes: Volume[];
    keywords: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  