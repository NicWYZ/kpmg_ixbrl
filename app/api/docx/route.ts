import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import mammoth from 'mammoth';

// Multer setup for handling file uploads
interface MulterRequest extends NextApiRequest {
    file: Express.Multer.File;
  }

  const upload = multer({ dest: './public/uploads/' });

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

  try {
    const result = await mammoth.convertToHtml({ buffer: file.buffer });
    res.send(result.value);
  } catch (error) {
    res.status(500).send('Error converting .docx file to HTML');
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;