import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import ExcelJS from 'exceljs';

// Multer setup for handling file uploads
interface MulterRequest extends NextApiRequest {
    file: Express.Multer.File;
  }
  
const upload = multer({ dest: 'uploads/' });

const apiRoute = nextConnect<MulterRequest, NextApiResponse>({
  onError: (error: any, req: MulterRequest, res: NextApiResponse) => {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch: (req: MulterRequest, res: NextApiResponse) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: MulterRequest, res: NextApiResponse) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(file.buffer);
    let html = '<table class="table-auto border-collapse border border-gray-400">';
    
    workbook.eachSheet((sheet, sheetId) => {
      sheet.eachRow((row, rowIndex) => {
        html += '<tr class="border border-gray-300">';
        row.eachCell((cell, colIndex) => {
          html += `<td class="border border-gray-300 p-2">${cell.value}</td>`;
        });
        html += '</tr>';
      });
    });
    
    html += '</table>';
    res.send(html);
  } catch (error) {
    res.status(500).send('Error converting .xlsx file to HTML');
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;