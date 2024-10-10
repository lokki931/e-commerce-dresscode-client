import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let token = request.cookies.get('access-token')?.value;

  if (request.nextUrl.pathname == '/register' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (request.nextUrl.pathname == '/register') {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname == '/signin' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (request.nextUrl.pathname == '/signin') {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith('/dashboard') && token) {
    return NextResponse.next();
  } else if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/api') && token) {
    return NextResponse.next();
  } else if (request.nextUrl.pathname.startsWith('/api') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/signin', '/register'],
};
