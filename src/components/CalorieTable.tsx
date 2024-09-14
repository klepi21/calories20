import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { db } from '@/app/firebase'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface FoodItem {
  food: string;
  calories: number;
}

const foodEmojis: { [key: string]: string } = {
  "apple": "🍎", "banana": "🍌", "orange": "🍊", "grape": "🍇", "strawberry": "🍓",
  "watermelon": "🍉", "pineapple": "🍍", "mango": "🥭", "pear": "🍐", "peach": "🍑",
  "cherry": "🍒", "kiwi": "🥝", "coconut": "🥥", "avocado": "🥑", "eggplant": "🍆",
  "potato": "🥔", "carrot": "🥕", "corn": "🌽", "hot pepper": "🌶️", "cucumber": "🥒",
  "broccoli": "🥦", "garlic": "🧄", "onion": "🧅", "mushroom": "🍄", "peanut": "🥜",
  "bread": "🍞", "croissant": "🥐", "baguette": "🥖", "pretzel": "🥨", "bagel": "🥯",
  "pancake": "🥞", "waffle": "🧇", "cheese": "🧀", "meat": "🍖", "poultry leg": "🍗",
  "cut of meat": "🥩", "bacon": "🥓", "hamburger": "🍔", "french fries": "🍟", "pizza": "🍕",
  "hot dog": "🌭", "sandwich": "🥪", "taco": "🌮", "burrito": "🌯", "stuffed flatbread": "🥙",
  "egg": "🥚", "cooking": "🍳", "shallow pan of food": "🥘", "pot of food": "🍲", "bowl with spoon": "🥣",
  "green salad": "🥗", "popcorn": "🍿", "butter": "🧈", "salt": "🧂", "canned food": "🥫",
  "sushi": "🍣", "fried shrimp": "🍤", "fish cake": "🍥", "spaghetti": "🍝", "curry": "🍛",
  "ramen": "🍜", "stew": "🍲", "fish": "🐟", "rice": "🍚", "dessert": "🍮"
}

interface CalorieTableProps {
  foodItems?: FoodItem[]
}

export default function CalorieTable({ foodItems = [] }: CalorieTableProps) {
  const [items, setItems] = useState<FoodItem[]>(foodItems)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, loading: authLoading } = useAuth() // Add loading state from useAuth
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (authLoading) return // Don't do anything while auth is still loading

    const fetchTodaysFoodItems = async () => {
      if (!user) {
        setError('User not authenticated')
        setIsLoading(false)
        return
      }

      try {
        console.log('Attempting to fetch document for user:', user.uid)
        const docRef = doc(db, 'userCalories', `${user.uid}_${today}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          console.log('Document exists:', docSnap.data())
          const data = docSnap.data()
          setItems(data.food || [])
        } else {
          console.log('No document found for today')
          setItems([])
        }
      } catch (error) {
        console.error('Error fetching food items:', error)
        setError('Failed to fetch food items')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodaysFoodItems()
  }, [user, today, authLoading]) // Add authLoading to dependencies

  // Update the totalCalories calculation
  const totalCalories = items.reduce((sum, item) => sum + Number(item.calories), 0)

  const deleteFoodItem = async (item: FoodItem) => {
    if (!user) {
      setError('User not authenticated')
      return
    }

    try {
      const docRef = doc(db, 'userCalories', `${user.uid}_${today}`)
      await updateDoc(docRef, {
        food: arrayRemove(item)
      })

      setItems(prevItems => prevItems.filter(i => i !== item))
    } catch (error) {
      console.error('Error deleting food item:', error)
      setError('Failed to delete food item')
    }
  }

  const getEmoji = (foodName: string): string => {
    const lowercaseName = foodName.toLowerCase()
    for (const [key, emoji] of Object.entries(foodEmojis)) {
      if (lowercaseName.includes(key)) {
        return emoji
      }
    }
    return '🍽️'
  }

  if (authLoading || isLoading) return <div className="text-center py-4">Loading...</div>
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>
  if (!user) return <div className="text-center py-4">Please log in to view your food diary.</div>

  return (
    <div className="w-[95%] max-w-[100%] mx-auto px-3 py-4 mb-6 -mt-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg shadow-lg">
      <h3 className="font-bold text-2xl mb-4 text-orange-800">Today's Food Diary</h3>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow transition-all hover:shadow-md">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getEmoji(item.food)}</span>
                <span className="font-medium text-gray-800">{item.food}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-orange-600">{item.calories} cal</span>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gray-900">Delete food item?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-700">
                        This will remove "{item.food}" from your food list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-200 text-gray-800">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteFoodItem(item)} className="bg-red-500 text-white">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No food items recorded for today.</p>
      )}
      <div className="flex justify-between font-bold mt-4 pt-4 border-t-2 border-orange-200 text-lg">
        <span className="text-orange-800">Total Calories</span>
        <span className="text-orange-600">{totalCalories.toLocaleString()} cal</span>
      </div>
    </div>
  )
}