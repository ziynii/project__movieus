import client from '@/libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const followings = await client.follow.findMany({
    where: {
      followById: user?.id,
    },
    select: {
      followFor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    followings,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
