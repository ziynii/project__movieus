import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';
import client from '@/libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { rate, review, posterUrl },
  } = req;

  if (req.method === 'GET') {
    const reviews = await client.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      where: {
        movieId: Number(id),
      },
    });

    res.json({
      ok: true,
      reviews,
    });
  }

  if (req.method === 'POST') {
    const newReview = await client.review.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        movieId: Number(id),
        rate: Number(rate),
        review,
				posterUrl
      },
    });

    res.json({
      ok: true,
      review: newReview,
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
