import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/inbox', '/my-tasks']
const AUTH_PAGES         = ['/login', '/register']
const TOKEN_COOKIE       = 'hs-token' // Updated to match store's hs-token but typically tokens are in cookies for middleware

export function proxy(req: NextRequest) {
  // Simple check for token in cookies (requires update to login/register logic later to set cookie)
  const token      = req.cookies.get(TOKEN_COOKIE)?.value
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  const isAuthPage  = AUTH_PAGES.some(p => pathname.startsWith(p))

  if (isProtected && !token) {
    // If we're using localStorage for tokens, middleware can't read it.
    // For now, I'll keep the logic but note that we need to switch to cookies for true middleware protection.
    // return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isAuthPage && token) {
    // return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
