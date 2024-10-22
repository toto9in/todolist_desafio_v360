import { getToken } from 'next-auth/jwt'; // Import the function to get the token
import { NextResponse } from 'next/server';
import { NextRequestWithAuth } from 'next-auth/middleware';

export async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });

  const response = NextResponse.next();

  if (token) {
    response.cookies.set({
      name: 'JWT',
      value: token.auth_token as unknown as string,
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      secure: true,
    });
  } else {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|images|assets|public|favicon.ico|login).*)', // Exclude specific routes like API, assets, and login
  ],
};
