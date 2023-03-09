import client from '@/libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = req.session;

  if (!session?.user) return res.status(401).end();
  if (session?.user) {
    await req.session.destroy();
  }

  return res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    fn: handler,
    isPrivate: true,
  })
);
