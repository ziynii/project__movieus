import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface WithHandlerProps {
  method: 'GET' | 'POST' | 'DELETE';
  fn: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate: boolean;
}

export default function withHandler({
  method,
  fn,
  isPrivate,
}: WithHandlerProps) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false });
    }

    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
