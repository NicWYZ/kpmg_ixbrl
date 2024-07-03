import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

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

    // Load the Excel file using ExcelJS
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    // Convert the Excel data to HTML
    let html = '<table class="table-auto border-collapse border border-gray-400">';
    workbook.eachSheet((sheet) => {
      sheet.eachRow((row) => {
        html += '<tr class="border border-gray-300">';
        row.eachCell((cell) => {
          html += `<td class="border border-gray-300 p-2">${cell.value}</td>`;
        });
        html += '</tr>';
      });
    });
    html += '</table>';

    return NextResponse.json({ html }, { status: 200 });
  } catch (error) {
    console.error('Error processing the file:', error);
    return NextResponse.json({ error: 'Error processing the file' }, { status: 500 });
  }
}