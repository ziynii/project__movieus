import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;

  const foundVideo = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => data.results);

  if (foundVideo.length === 0) {
    return res.status(404).json({
      ok: false,
      error: '제공되는 비디오가 없습니다.',
    });
  }

  res.json({
    ok: true,
    foundVideo,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
