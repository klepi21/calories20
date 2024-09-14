import Link from 'next/link'
import { Apple, Carrot, Sandwich } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-1.5 w-full shadow-lg z-20 fixed bottom-0 left-0 right-0">
      <nav className="max-w-7xl mx-auto">
        <ul className="flex justify-around items-center">
          <li>
            <Link href="/" className="flex flex-col items-center transition-transform hover:scale-110">
              <div className="bg-white p-1.5 rounded-full mb-0.5">
                <Apple className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-xs font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/calendar" className="flex flex-col items-center transition-transform hover:scale-110">
              <div className="bg-white p-1.5 rounded-full mb-0.5">
                <Carrot className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-xs font-medium">Calendar</span>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex flex-col items-center transition-transform hover:scale-110 pointer-events-none opacity-50">
              <div className="bg-white p-1.5 rounded-full mb-0.5">
                <Sandwich className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}