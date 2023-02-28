import client from '@/libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const profile = await client.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      _count: {
        select: {
          reviews: true,
          follower: true,
          following: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
