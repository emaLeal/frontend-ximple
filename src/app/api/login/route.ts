import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST (request: NextRequest) {
  const body = await request.json()
  const url = process.env.API_URL + '/auth/jwt/create'
  const cookie = cookies()
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }) // Solicitud Api

    if (res.ok) {
      const json = await res.json()
      cookie.set({
        name: 'isAuth',
        value: JSON.stringify({ ...json, isAuth: true }),
        httpOnly: true,
        path: '/'
      }) // Todo salió bien
      return NextResponse.json(json, { status: res.status })
    }
    throw res
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status })
  }
}
