import type { NextFetchEvent } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, _: NextFetchEvent) {
  const { 'eschart.token': token } = req.cookies;
  const { origin } = req.nextUrl.clone();

  if (token && req.page.name === '/') {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  if (!token && req.page.name !== '/') {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}
