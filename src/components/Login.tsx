// components/Login.tsx
'use client'

import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setError('')
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (error) {
      setError('Authentication failed. Please try again.')
      console.error('Auth error:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Welcome to Calorie Tracker</h2>
        <p className="text-center text-gray-600">Sign in to start tracking your calories</p>
        <Button 
          onClick={handleGoogleSignIn} 
          className="w-full flex items-center justify-center space-x-2"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Sign in with Google</span>
        </Button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  )
}