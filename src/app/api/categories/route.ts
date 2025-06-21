import { NextRequest, NextResponse } from 'next/server';
import { BookModel } from '@/models/Books';

export async function GET(request: NextRequest) {
  try {
    const categories = await BookModel.distinct('category');
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
