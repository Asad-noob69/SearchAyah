import { NextRequest, NextResponse } from 'next/server';
import { BookModel } from '@/models/Books';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let books;

    if (search) {
      books = await BookModel.searchBooks(search, category || undefined);
    } else if (category) {
      books = await BookModel.findByCategory(category);
    } else {
      books = await BookModel.findAll();
    }
    
    return NextResponse.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, imageUrl, keywords, volumes } = body;

    if (!title || !description || !category || !imageUrl || !volumes || !Array.isArray(volumes)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (title, description, category, imageUrl, volumes)' },
        { status: 400 }
      );
    }

    if (!keywords || !Array.isArray(keywords) || keywords.some((k: string) => !k.trim())) {
      return NextResponse.json(
        { success: false, error: 'Keywords must be an array of non-empty strings' },
        { status: 400 }
      );
    }

    const book = await BookModel.create({
      title,
      description,
      category,
      imageUrl,
      keywords,
      volumes
    });

    return NextResponse.json({
      success: true,
      data: book
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create book' },
      { status: 500 }
    );
  }
}