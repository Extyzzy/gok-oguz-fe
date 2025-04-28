'use client'

import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { user, isAuthenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid credentials or not an admin')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow'>
        <h1 className='text-2xl font-bold text-center'>Admin Login</h1>
        {error && <div className='p-2 text-center text-red-500 bg-red-100 rounded'>{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <Input
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type='submit' color='primary' fullWidth>
            Login
          </Button>
          <Button
            variant='light'
            startContent={<ChevronDownIcon className='rotate-90' />}
            as={Link}
            href='/'
          >
            Back to website
          </Button>
        </form>
      </div>
    </div>
  )
}
