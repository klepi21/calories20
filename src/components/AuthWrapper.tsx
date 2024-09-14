'use client'

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import Login from '@/components/Login'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>
}
