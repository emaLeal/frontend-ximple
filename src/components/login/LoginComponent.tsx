'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginForm } from '@/types/auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import React from 'react'
import LoginFormRender from './LoginFormRender'
import { Button } from 'primereact/button'
import Link from 'next/link'

const initialForm: LoginForm = {
  email: '',
  password: ''
}

const LoginComponent = () => {
  const router = useRouter()
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: initialForm });

  const onSubmit = async (data: LoginForm) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (res.ok) {
      router.push('/')
    } else {
      console.log(res.status, res.statusText)
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-fluid' method='post'>
      <LoginFormRender control={control} errors={errors} />
      <Button type="submit" label="Iniciar Secion" className="mt-2 p-button p-button-rounded p-button-text" />
      <h4>¿No tienes una cuenta? <Link href={'/registro'}>Registrate aqui</Link></h4>
    </form>
  )
}

export default LoginComponent