export async function fetchLib (enpoint: string, options: RequestInit) {
  const url = process.env.API_URL + enpoint
  const res = await fetch(url, options)

  return res
}


