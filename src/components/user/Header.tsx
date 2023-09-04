'use server'

import MenuComponent from './Menu'
import NavBar from './NavBar'

export default async function Header ({ permissions }: any) {
  return (
    <>
      <NavBar permissions={permissions} />
      <MenuComponent />
    </>
  )
}
