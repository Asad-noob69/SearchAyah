import { Schema, model, Document, Model } from "mongoose";

interface Volume {
  volumeNumber: number;
  downloadUrl: string;
}

interface Book extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  keywords: string[];
  volumes: Volume[];
  createdAt: Date;
  updatedAt?: Date;
}

interface BookModel extends Model<Book> {
  findAll(limit: number, page: number): Promise<Book[]>;
  findByCategory(category: string, limit: number, page: number): Promise<Book[]>;
  searchBooks(search: string, category: string | undefined, limit: number, page: number): Promise<Book[]>;
  countAll(): Promise<number>;
  countByCategory(category: string): Promise<number>;
  countSearchBooks(search: string, category: string | undefined): Promise<number>;
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  keywords: [{ type: String, required: true }],
  volumes: [{ volumeNumber: Number, downloadUrl: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Static methods
bookSchema.statics.findAll = async function (limit: number, page: number) {
  return this.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};

bookSchema.statics.findByCategory = async function (category: string, limit: number, page: number) {
  return this.find({ category })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};

bookSchema.statics.searchBooks = async function (
  search: string,
  category: string | undefined,
  limit: number,
  page: number
) {
  const query: any = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { keywords: { $regex: search, $options: "i" } },
    ],
  };
  if (category) query.category = category;
  return this.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
};

bookSchema.statics.countAll = async function () {
  return this.countDocuments().exec();
};

bookSchema.statics.countByCategory = async function (category: string) {
  return this.countDocuments({ category }).exec();
};

bookSchema.statics.countSearchBooks = async function (search: string, category: string | undefined) {
  const query: any = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { keywords: { $regex: search, $options: "i" } },
    ],
  };
  if (category) query.category = category;
  return this.countDocuments(query).exec();
};

const BookModel = model<Book, BookModel>("Book", bookSchema);

export { BookModel };