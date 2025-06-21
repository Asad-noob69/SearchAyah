import { NextRequest, NextResponse } from 'next/server';
import { BookModel } from '@/models/Books';

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const book = await BookModel.findById(params.id);
    
    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const body = await request.json();
    const { title, description, category, imageUrl, keywords, volumes } = body;

    if (keywords && (!Array.isArray(keywords) || keywords.some((k: string) => !k.trim()))) {
      return NextResponse.json(
        { success: false, error: 'Keywords must be an array of non-empty strings' },
        { status: 400 }
      );
    }

    const updatedBook = await BookModel.update(params.id, body);
    
    if (!updatedBook) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update book' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const deleted = await BookModel.delete(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete book' },
      { status: 500 }
    );
  }
}