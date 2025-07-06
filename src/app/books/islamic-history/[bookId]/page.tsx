import BookPopup from "./BookPopup";
import { notFound } from "next/navigation";
import { bookApi } from "@/utils/api";

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params;

  try {
    const bookId = resolvedParams.bookId;
    if (!bookId) throw new Error("Book ID is missing");

    const apiUrl = new URL(
      `/api/books/${encodeURIComponent(bookId)}`,
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    );

    const response = await fetch(apiUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        title: "Book Not Found",
        description: "Book not found.",
        keywords: "Islamic history, Muslim history, early Islamic period, Caliphate history, Islamic civilization",
      };
    }

    const data = await response.json();
    if (!data.success || !data.data) {
      return {
        title: "Book Not Found",
        description: "Book not found.",
        keywords: "Islamic history, Muslim history, early Islamic period, Caliphate history, Islamic civilization",
      };
    }

    const book = bookApi.formatBookForFrontend(data.data);

    return {
      title: book?.title || "Book Not Found",
      description: book?.description.slice(0, 160) || "Book not found.",
      keywords: book?.keywords?.join(", ") || "Islamic history, Muslim history, Caliphate, Islamic civilization",
    };
  } catch (error) {
    console.error("Error generating metadata for Islamic History book:", error);
    return {
      title: "Book Not Found",
      description: "Book not found.",
      keywords: "Islamic history, Muslim history",
    };
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params;

  try {
    const bookId = resolvedParams.bookId;
    if (!bookId) throw new Error("Book ID is missing");

    const apiUrl = new URL(
      `/api/books/${encodeURIComponent(bookId)}`,
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    );

    console.log("Fetching Islamic History book from:", apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      notFound();
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      console.error("Invalid response from API:", data);
      notFound();
    }

    const book = bookApi.formatBookForFrontend(data.data);
    if (!book) {
      console.error("Failed to format book");
      notFound();
    }

    return <BookPopup book={book} />;
  } catch (error) {
    console.error("Error loading Islamic History book page:", error);
    notFound();
  }
}
