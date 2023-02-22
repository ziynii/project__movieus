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
    body: { title, posterUrl },
  } = req;

  const alreadyFav = await client.movieLike.findFirst({
    where: {
      movieId: Number(id),
      userId: user?.id,
    },
  });

  if (alreadyFav) {
    await client.movieLike.delete({
      where: {
        id: alreadyFav.id,
      },
    });
  } else {
    await client.movieLike.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        movieId: Number(id),
        title,
        posterUrl,
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
