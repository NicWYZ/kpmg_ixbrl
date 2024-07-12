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

    // Convert the file to HTML using mammoth with custom styles
    const options = {
      styleMap: [
        "u => span.style-underlined",
        "table => table.table-auto",
      ]
    };

    const result = await mammoth.convertToHtml({ buffer }, options);
    let html = result.value;

    // Post-process the HTML to add class names to tr and td elements
    html = html.replace(/<td>/g, '<td class="border">');

    return NextResponse.json({ html }, { status: 200 });
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ error: 'Error processing the file' }, { status: 500 });
  }
}