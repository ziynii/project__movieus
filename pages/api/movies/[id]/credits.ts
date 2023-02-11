import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

export interface ICast {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string;
  character?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const allCredits = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=ko-KR
		`
  ).then((res) => res.json());

  const director = allCredits?.crew
    .filter((cast: ICast) => cast.known_for_department === 'Directing')
    .slice(0, 1);

	const casts = allCredits?.cast.slice(0,4)

  res.json({
    ok: true,
    director,
		casts
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    fn: handler,
    isPrivate: true,
  })
);
