// app/calendar/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CalorieTable from '@/components/CalorieTable'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handlePrevDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
  }

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Food History</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevDay}>&lt;</Button>
        <h2 className="text-xl">{selectedDate.toDateString()}</h2>
        <Button onClick={handleNextDay}>&gt;</Button>
      </div>
      <CalorieTable foodItems={[
        { name: "Sandwich", calories: 350 },
        { name: "Salad", calories: 120 },
        { name: "Yogurt", calories: 150 }
      ]} />
    </div>
  )
}