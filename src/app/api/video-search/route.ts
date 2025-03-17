// src/app/api/video-search/route.ts
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST(req: NextRequest) {
  let tempPath: string | null = null;
  try {
    const formData = await req.formData();
    const videoFile = formData.get('video') as File;

    if (!videoFile) {
      return NextResponse.json({ error: 'No video file uploaded' }, { status: 400 });
    }

    const tempDir = join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const arrayBuffer = await videoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const sanitizedFileName = videoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    tempPath = join(tempDir, sanitizedFileName);
    await writeFile(tempPath, buffer);

    // Verify Python script exists
    const pythonScript = join(process.cwd(), 'scripts', 'audio_processor.py');
    if (!fs.existsSync(pythonScript)) {
      throw new Error(`Python script not found at: ${pythonScript}`);
    }

    const command = `python "${pythonScript}" "${tempPath}"`;
    const { stdout, stderr } = await execPromise(command);

    // Clean up temp file
    if (tempPath && fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }

    const result = JSON.parse(stdout);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("❌ Error processing video:", error);
    
    // Clean up temp file if it exists
    if (tempPath && fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }

    return NextResponse.json({ 
      error: 'Failed to process video',
      details: error.message || String(error),
      stderr: error.stderr || ''
    }, { status: 500 });
  }
}