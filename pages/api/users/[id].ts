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

  const userInfo = await client.user.findUnique({
    where: {
      id: Number(id),
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

  let isCurrentUser;

  if (userInfo?.id === user?.id) {
    isCurrentUser = true;
  } else {
    isCurrentUser = false;
  }

  res.json({
    ok: true,
    userInfo,
    isCurrentUser,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
