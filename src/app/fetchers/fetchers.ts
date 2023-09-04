'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getToken () {
  if (cookies().has('isAuth')) {
    const token = JSON.parse(cookies().get('isAuth')!.value).access
    return token
  } else {
    return 'No se encontró'
  }
}

export async function getProfile () {
  const token = await getToken()

  try {
    const url = process.env.API_URL + '/auth/users/me'
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.ok) {
      const json = await res.json()
      return json
    }
    throw res
  } catch (error: any) {
    if (error.status === 401) {
      refresh()
    }
    return error
  }
}

export async function getPermissions (profile: number) {
  const url = process.env.API_URL + `/api/roles/${profile}`
  const token = await getToken()

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.ok) {
      const json = await res.json()
      return json
    }
    throw res
  } catch (error: any) {
    if (error.status === 401) {
      refresh()
    }
    return error
  }
}

export async function refresh () {
  if (cookies().has('isAuth')) {
    const refresh = JSON.parse(cookies().get('isAuth')!.value).refresh
    const url = process.env.API_URL + '/auth/jwt/refresh'
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ refresh })
      })
      if (res.ok) {
        const json = await res.json()
        cookies().set({
          name: 'isAuth',
          value: JSON.stringify({ ...json, isAuth: true }),
          httpOnly: true,
          path: '/'
        }) // Todo salió bien)
        console.log('ok')
      }
      redirect('/user')
    } catch (error) {
      cookies().delete('isAuth')
      redirect('/login')
    }
  }
}
