import './Home.css'
import OutfitGrid from '../components/OutfitGrid';
import { categories } from '../data/categories';
import CategoriesCard from '../components/CategoriesCard';
import { useState } from 'react';
import { useOutfits } from '../context/OutfitContext';


function Home() {
  const [selectedCategory, setSelectedCategory] = useState(999)
  const {outfits, loading} = useOutfits()


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
      {loading ? (
         <p className="text-center text-purple-500 mt-20">Yükleniyor...</p>
      ): filteredCombinations.length === 0  ? (
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
      />
      )} 
    </div>
  )
}

export default Home