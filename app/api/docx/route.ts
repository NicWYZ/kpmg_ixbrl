import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';


export async function POST(req: NextRequest) {
  try {
    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read the file content
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert the file to HTML using mammoth
    const result = await mammoth.convertToHtml({ buffer });

    return NextResponse.json({ html: result.value }, { status: 200 });
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ error: 'Error processing the file' }, { status: 500 });
  }
}