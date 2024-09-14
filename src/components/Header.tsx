'use client'

import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/hooks/useAuth'
import { LogOut, Apple, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

export default function Header() {
  const { user } = useAuth()

  const handleLogout = () => {
    signOut(auth)
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className="bg-gradient-to-r from-orange-400 to-red-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Apple className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">CaiLorie Tracker</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 rounded-full py-1 px-3">
              <Avatar className="h-8 w-8 border-2 border-white">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                ) : (
                  <AvatarFallback className="bg-orange-200 text-orange-800 font-semibold">
                    {getInitials(user?.displayName)}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-white font-medium hidden sm:inline-block">
                {user?.displayName || 'User'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}