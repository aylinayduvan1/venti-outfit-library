import './Home.css'
import OutfitGrid from '../components/OutfitGrid';
import { outfits } from '../data/outfits';
import { categories } from '../data/categories';
import CategoriesCard from '../components/CategoriesCard';
import { useEffect, useState } from 'react';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(999)
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]

      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
  }

  const filteredCombinations =
    selectedCategory === 999
      ? outfits
      : outfits.filter(item => item.categoryId === selectedCategory)

  return (
    <div className="home-container">
      <CategoriesCard
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <OutfitGrid
        items={filteredCombinations}
        favorites={favorites}
        onToggleFavorites={toggleFavorite}
      />
    </div>
  )
}

export default Home