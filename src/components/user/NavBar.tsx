'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import React, { useRef } from 'react'

const NavBar = ({ permissions }: any) => {
  const menu = useRef<any>(null)
  const nav = useRouter()
  const items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      command: () => nav.push('/')
    }
  ]
  if (permissions.can_create) {
    items.push(
      {
        label: 'Roles',
        icon: 'pi pi-user-edit',
        command: () => nav.push('/roles')
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        command: () => nav.push('/users')
      },
      {
        label: 'Categorias',
        icon: 'pi pi-tag',
        command: () => nav.push('/categorias')
      },
      {
        label: 'Recargar Puntos',
        icon: 'pi pi-dollar',
        command: () => nav.push('/wallet')
      },
      {
        label: 'Historial',
        icon: 'pi pi-history',
        command: () => nav.push('/historial')
      }
    )
  }

  return (
    <>
      <Menu model={items} ref={menu} popup />
      <Button
        type='button'
        text
        raised
        severity='success'
        iconPos='right'
        icon='pi pi-bars'
        onClick={event => menu.current.toggle(event)}
      ></Button>
    </>
  )
}

export default NavBar
