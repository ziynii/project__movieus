import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const recommend = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}&language=ko-KR&page=1
		`
  )
    .then((res) => res.json())
    .then((data) => data.results);

  res.json({
    ok: true,
    recommend,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
