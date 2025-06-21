import { NextRequest, NextResponse } from 'next/server';
import { BookModel } from '@/models/Books';

interface Params {
  id: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const body = await request.json();
    const { volumeNumber, downloadUrl } = body;

    if (!volumeNumber || !downloadUrl) {
      return NextResponse.json(
        { success: false, error: 'Volume number and download URL are required' },
        { status: 400 }
      );
    }

    const success = await BookModel.addVolume(params.id, {
      volumeNumber,
      downloadUrl
    });

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Volume added successfully'
    });
  } catch (error) {
    console.error('Error adding volume:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add volume' },
      { status: 500 }
    );
  }
}