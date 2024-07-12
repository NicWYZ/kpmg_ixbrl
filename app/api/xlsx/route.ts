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
    let html = '<table class="table-auto">';

    workbook.eachSheet((sheet) => {
      const merges: { [key: string]: { master: string; rowspan: number; colspan: number } } = {};

      // Collect all merged cells
      sheet.model.merges.forEach((merge: string) => {
        const [start, end] = merge.split(':');
        const startCell = sheet.getCell(start);
        const endCell = sheet.getCell(end);
        const startRow = parseInt(startCell.row as any, 10);
        const endRow = parseInt(endCell.row as any, 10);
        const startCol = parseInt(startCell.col as any, 10);
        const endCol = parseInt(endCell.col as any, 10);
        const rowspan = endRow - startRow + 1;
        const colspan = endCol - startCol + 1;

        for (let row = startRow; row <= endRow; row++) {
          for (let col = startCol; col <= endCol; col++) {
            const cellAddress = `${row}:${col}`;
            merges[cellAddress] = { master: startCell.address, rowspan, colspan };
          }
        }
      });

      sheet.eachRow((row) => {
        html += '<tr class="border">';
        row.eachCell({ includeEmpty: true }, (cell) => {
          const cellAddress = `${cell.row}:${cell.col}`;
          const merge = merges[cellAddress];

          if (merge && cell.address === merge.master) {
            const rowspan = merge.rowspan;
            const colspan = merge.colspan;
            html += `<td class="border p-2" rowspan="${rowspan}" colspan="${colspan}">${cell.value}</td>`;
          } else if (!merge) {
            html += `<td class="border p-2">${cell.value !== null ? cell.value : ''}</td>`;
          }
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