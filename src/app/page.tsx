'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DailyFoodInput from '@/components/DailyFoodInput'
import CalorieTable from '@/components/CalorieTable'

export default function MainPage() {
  const [tableKey, setTableKey] = useState(0)

  const handleFoodSaved = () => {
    setTableKey(prevKey => prevKey + 1)
  }

  return (
    <main className="container mx-auto px-2 py-4 bg-transparent">
      <DailyFoodInput onFoodSaved={handleFoodSaved} />
      <div className="mt-8"> {/* Added padding */}
        <CalorieTable key={tableKey} />
      </div>
    </main>
  )
}