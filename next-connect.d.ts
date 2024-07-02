// next-connect.d.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';

declare module 'next-connect' {

  interface Options {
    onError?: (err: any, req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void;
    onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void;
  }

  interface RequestHandler {
    (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void): void;
  }

  export default function nextConnect<Req = IncomingMessage, Res = ServerResponse>(options?: Options): {
    use: (...handlers: RequestHandler[]) => any;
    get: (...handlers: RequestHandler[]) => any;
    post: (...handlers: RequestHandler[]) => any;
    put: (...handlers: RequestHandler[]) => any;
    delete: (...handlers: RequestHandler[]) => any;
    patch: (...handlers: RequestHandler[]) => any;
    options: (...handlers: RequestHandler[]) => any;
    handler: (req: Req, res: Res) => void;
  };
}