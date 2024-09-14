import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthWrapper from '../components/AuthWrapper'
import { Toaster } from "@/components/ui/toaster"
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-orange-50 text-slate-800">
        <div className="food-emoji-background fixed inset-0 z-0 opacity-40"></div>
        <AuthWrapper>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg  p-6">
              {children}
            </div>
          </main>
          <Footer />
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  )
}