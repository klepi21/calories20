// components/CalendarView.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handlePrevDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
  }

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevDay}>&lt;</Button>
        <h2>{selectedDate.toDateString()}</h2>
        <Button onClick={handleNextDay}>&gt;</Button>
      </div>
      {/* Here you would fetch and display the food data for the selected date */}
    </div>
  )
}