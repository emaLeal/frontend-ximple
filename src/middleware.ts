import { NextRequest, NextResponse } from 'next/server'

export async function middleware (request: NextRequest) {
  const url = request.nextUrl.pathname

  if (url === '/') {
    const isAuth = request.cookies.has('isAuth')

    if (isAuth) {
      const auth = JSON.parse(request.cookies.get('isAuth')!.value).isAuth
      if (auth) {
        return NextResponse.redirect(new URL('/user', request.url))
      }
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  if (url === '/login') {
    const isAuth = request.cookies.has('isAuth')
    if (isAuth) {
      const auth = JSON.parse(request.cookies.get('isAuth')!.value).isAuth
      if (auth) {
        return NextResponse.redirect(new URL('/user', request.url))
      }
    }
    return NextResponse.next()
  }

  if (url.startsWith('/user')) {
    const isAuth = request.cookies.has('isAuth')
    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}


