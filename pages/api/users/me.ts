import client from '@/libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  if (req.method === 'GET') {
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

  if (req.method === 'PUT') {
    const { name, about, avatarId } = req.body;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (name !== currentUser?.name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }

    if (about !== currentUser?.about) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          about,
        },
      });
    }

		if(avatarId) {
			await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
		}

    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'PUT'],
    fn: handler,
    isPrivate: true,
  })
);
