import { NextRequest, NextResponse } from "next/server";
import { BookModel } from "@/models/Books";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch book by ID
    const book = await BookModel.findById(id);

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch book",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, category, imageUrl, keywords, volumes } = body;

    // Validate required fields
    if (!title || !description || !category || !imageUrl || !volumes || !Array.isArray(volumes)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields (title, description, category, imageUrl, volumes)",
        },
        { status: 400 }
      );
    }

    if (!keywords || !Array.isArray(keywords) || keywords.some((k: string) => !k.trim())) {
      return NextResponse.json(
        { success: false, error: "Keywords must be an array of non-empty strings" },
        { status: 400 }
      );
    }

    // Update book
    const book = await BookModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        imageUrl,
        keywords,
        volumes,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update book",
      },
      { status: 500 }
    );
  }
}