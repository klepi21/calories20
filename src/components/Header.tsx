'use client'

import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/hooks/useAuth'
import { LogOut, Apple, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    signOut(auth)
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-2 rounded-full shadow-md transform transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12">
              <Apple className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:tracking-wide transition-all duration-300">
              CaiLorie
              <span className="text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300">Tracker</span>
            </h1>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex bg-white/10 backdrop-blur-sm rounded-full py-2 px-4 items-center space-x-3 shadow-inner transition-all duration-300 hover:bg-white/20">
              <Avatar className="h-10 w-10 ring-2 ring-white/50 transition-all duration-300 hover:ring-white">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-orange-300 to-red-400 text-white font-bold">
                    {getInitials(user?.displayName)}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-white font-medium text-sm">
                {user?.displayName || 'User'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Logout</span>
            </Button>
            <Button
              variant="ghost"
              className="sm:hidden text-white hover:bg-white/20 rounded-full p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden py-2">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full py-2 px-4 mb-2">
              <Avatar className="h-10 w-10 ring-2 ring-white/50">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-orange-300 to-red-400 text-white font-bold">
                    {getInitials(user?.displayName)}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-white font-medium text-sm">
                {user?.displayName || 'User'}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}