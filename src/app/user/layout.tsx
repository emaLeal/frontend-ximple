import Header from '@/components/user/Header'
import { getPermissions, getProfile } from '../fetchers/fetchers'

export default async function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  const profile = await getProfile()
  const permissions = await getPermissions(profile.rol)
  return (
    <>
      <header className='w-screen flex justify-between px-2 py-2'>
        <Header permissions={permissions} />
      </header>
      <main>{children}</main>
    </>
  )
}
