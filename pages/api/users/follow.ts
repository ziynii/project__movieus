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
    body: { followFor },
  } = req;

  const alreadyFollow = await client.follow.findFirst({
    where: {
      followById: user?.id,
      followForId: followFor,
    },
  });

  if (alreadyFollow) {
    await client.follow.delete({
      where: {
        id: alreadyFollow.id,
      },
    });
  } else {
    await client.follow.create({
      data: {
        followById: user?.id!,
        followForId: followFor,
      },
    });
  }
  res.json({
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
