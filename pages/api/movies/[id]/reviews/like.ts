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
    body: { reviewId },
  } = req;

  if (req.method === 'GET') {
    const like = await client.review.findFirst({
      where: {
        id: reviewId,
      },
      include: {
        _count: {
          select: {
            like: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      like,
    });
  }

  if (req.method === 'POST') {
    const alreadyFav = await client.reviewLike.findFirst({
      where: {
        reviewId,
        userId: user?.id,
      },
    });

    if (alreadyFav) {
      await client.reviewLike.delete({
        where: {
          id: alreadyFav.id,
        },
      });
    } else {
      await client.reviewLike.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          review: {
            connect: {
              id: reviewId,
            },
          },
        },
      });
    }
    res.json({
      ok: true,
      alreadyFav,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    fn: handler,
    isPrivate: true,
  })
);
