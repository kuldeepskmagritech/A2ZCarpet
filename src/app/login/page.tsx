"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@a2zcarpet.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    setIsLoading(false)

    if (res?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-xl border border-border shadow-sm">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image src="/logo1.png" alt="A2Z Carpet" width={150} height={50} className="object-contain" />
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold font-serif">
            Sign in to your account
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Email address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 accent-primary border-border rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-muted">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-hover">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
