// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('auth.token')?.value

  // Protect admin routes
  if (pathname.startsWith('/admin') && !token) {
    console.log('No token found, redirecting to login')
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}
