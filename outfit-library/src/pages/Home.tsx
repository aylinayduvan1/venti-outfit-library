import './Home.css'
import OutfitGrid from '../components/OutfitGrid';
import { outfits } from '../data/outfits';
import { categories } from '../data/categories';
import CategoriesCard from '../components/CategoriesCard';
import { useEffect, useState } from 'react';

interface Props {
   favorites: number[];
    toggleFavorite: (id:number) => void
}

function Home({favorites, toggleFavorite}: Props) {
  const [selectedCategory, setSelectedCategory] = useState(999)


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
      {filteredCombinations.length === 0  ? (
        <div className="mt-20 flex flex-col items-center text-center text-purple-300">
          <i className="pi pi-box text-6xl mb-4 opacity-60"></i>
          <p className="text-lg font-medium">
            Bu kategoride henüz kombin yok
          </p>
          <p className="text-sm opacity-70 mt-1">
            İlk kombini sen eklemek ister misin?
          </p>
        </div>
      ) : (
        <OutfitGrid
        items={filteredCombinations}
        favorites={favorites}
        onToggleFavorites={toggleFavorite}
      />
      )}

      
    </div>
  )
}

export default Home