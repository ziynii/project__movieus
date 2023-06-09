import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';
import client from '@/libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { id },
  } = req;

  const reviews = await client.review.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          like: true,
        },
      },
    },
    where: {
      userId: Number(id),
    },
  });

  res.json({
    ok: true,
    reviews,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
