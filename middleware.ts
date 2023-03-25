import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/')) {
    const ua = userAgent(req);

    if (ua?.isBot) {
      return new Response('봇으로 접근할 수 없습니다.', { status: 403 });
    }
  }

  if (!req.nextUrl.pathname.startsWith('/api')) {
    if (!req.cookies.has('movieussession') && !req.url.includes('/login')) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

	if (req.nextUrl.pathname.startsWith('/login')) {
    if (req.cookies.has('movieussession')) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
