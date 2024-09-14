import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AuthWrapper from '../components/AuthWrapper'
import { Toaster } from "@/components/ui/toaster"
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-orange-50 text-slate-800">
        <div className="food-emoji-background fixed inset-0 z-0 opacity-40"></div>
        <AuthWrapper>
          <div className="flex-1 overflow-auto pb-16"> {/* Adjust pb-16 based on your footer height */}
            <Header />
            <main className="container mx-auto px-4 py-8 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  )
}