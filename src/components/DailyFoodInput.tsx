'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { db } from '@/app/firebase'
import { doc, setDoc, updateDoc, arrayUnion, getDoc, collection, where, getDocs } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { calculateCalories } from '@/utils/calorieCalculator'
import { Utensils } from 'lucide-react'

type FoodItem = { name: string; calories: number };

type DailyFoodInputProps = {
  onFoodSaved: () => void;
}

export default function DailyFoodInput({ onFoodSaved }: DailyFoodInputProps) {
  const [foodInput, setFoodInput] = useState('')
  const [error, setError] = useState('')
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [tableKey, setTableKey] = useState(0)
  const today = new Date().toISOString().split('T')[0]

  const getOrCreateDailyEntry = async () => {
    if (!user) {
      console.error('User is not authenticated');
      setError('You must be logged in to access this feature.');
      return null;
    }

    try {
      console.log('Attempting to access Firestore for user:', user.uid);
      const docRef = doc(db, 'userCalories', `${user.uid}_${today}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log('Document does not exist, creating new document');
        await setDoc(docRef, {
          date: today,
          userId: user.uid,
          userEmail: user.email,
          food: []
        });
        console.log('New document created successfully');
      } else {
        console.log('Document already exists');
      }

      return docRef;
    } catch (error) {
      console.error('Error accessing Firestore:', error);
      setError('Failed to access the database. Please check your connection and try again.');
      return null;
    }
  }

  useEffect(() => {
    const initializeDailyEntry = async () => {
      try {
        console.log('Initializing daily entry');
        await getOrCreateDailyEntry();
        setTableKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error('Error initializing daily entry:', error);
        setError('Failed to initialize daily entry. Please try again later.');
      }
    }

    if (user) {
      console.log('User authenticated, initializing daily entry');
      initializeDailyEntry();
    } else {
      console.log('User not authenticated');
    }
  }, [user, today]);

  const handleSave = async () => {
    if (!user) {
      setError('You must be logged in to save food items.')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      setError('Calculating calories... This may take a moment.')
      const calculatedItems = await calculateCalories(foodInput)
      setError('')

      const newFoodItems = Array.isArray(calculatedItems) ? calculatedItems : [calculatedItems]

      const docRef = await getOrCreateDailyEntry();
      if (docRef) {
        await updateDoc(docRef, {
          food: arrayUnion(...newFoodItems)
        });

        setFoodInput('')
        setTableKey(prevKey => prevKey + 1)
        onFoodSaved()
      } else {
        setError('Failed to get or create document for today. Please try again.')
      }
    } catch (error) {
      console.error('Error saving food items:', error)
      setError('Failed to save food items. Please check your connection and try again later.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-orange-800 mb-4">Add Meals</h2>
      <div className="space-y-4">
        <Textarea 
          placeholder="Enter what you ate today... (e.g.,2 eggs, 1 toast, 1 apple)"
          className="w-full p-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          rows={3}
        />
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <Utensils className="mr-2 h-5 w-5" />
          {isSaving ? 'Saving...' : 'Add to Food Diary'}
        </Button>
      </div>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mt-2 text-center">
          {error}
        </p>
      )}
    </div>
  )
}