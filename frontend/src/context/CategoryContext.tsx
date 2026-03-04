import { createContext, useContext, useEffect, useState } from 'react'
import type { Category } from 'types/categories'
import { fetchCategories } from 'services/category.service'

interface CategoryContextType {
  categories: Category[]
  loading: boolean
}

const CategoryContext = createContext<CategoryContextType | null>(null)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  )
}


export function useCategories() {
  const ctx = useContext(CategoryContext)
  if (!ctx) throw new Error('useCategories must be used inside CategoryProvider')
  return ctx
}
