'use client'
import React, { useRef } from 'react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useRouter } from 'next/navigation'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'

const MenuComponent = () => {
  const nav = useRouter()
  const menu = useRef<any>(false)
  const items = [
    {
      label: 'Ajustes',
      icon: 'pi pi-fw pi-wrench'
    },
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-users',
      command: () => {
        nav.push('/profile')
      }
    },
    {
      label: 'Tu empresa',
      icon: 'pi pi-building',
      command: () => {
        nav.push('/empresa')
      }
    },
    {
      label: 'Cerrar sesion',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        confirmDialog({
          message: 'Quieres cerrar sesion?',
          acceptLabel: 'Cerrar sesion',
          rejectLabel: 'Cancelar',
          header: 'Cerrar sesion?',
          accept: () => {
            nav.push('/login')
          }
        })
      }
    }
  ]
  return (
    <>
      <Button
        severity='success'
        rounded
        raised
        text
        icon='pi pi-user'
        iconPos='right'
        onClick={event => menu.current.toggle(event)}
      />
      <Menu model={items} ref={menu} popup />
      <ConfirmDialog />
    </>
  )
}

export default MenuComponent
