import './Home.css'
import OutfitGrid from '../components/OutfitGrid'
import CategoriesCard from '../components/CategoriesCard'
import { useEffect, useState } from 'react'
import { useOutfits } from '../context/OutfitContext'
import { useCategories } from '../context/CategoryContext'

function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('999') // Hepsi varsayılan

  const { outfits, fetchPublicOutfits } = useOutfits()
  const { categories, loading: categoriesLoading } = useCategories()

  const allCategories = [
    { _id: '999', 
      name: 'Hepsi', 
      image:'https://images.pexels.com/photos/3315286/pexels-photo-3315286.jpeg',
      slug:'' }, 
    ...categories
  ]

  useEffect(() => {
  if (selectedCategoryId === '999') {
    fetchPublicOutfits(null)
  } else {
    fetchPublicOutfits(selectedCategoryId)
  }
}, [selectedCategoryId])

  if (categoriesLoading) {
    return <p className="text-center mt-20">Kategoriler yükleniyor…</p>
  }

  return (
    <div className="home-container">
      <CategoriesCard
        categories={allCategories}
        selectedCategory={selectedCategoryId}
        onSelect={setSelectedCategoryId}
      />

      {categoriesLoading ? (
        <p className="text-center text-purple-500 mt-20">
          Yükleniyor...
        </p>
      ) : outfits.length === 0 ? (
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
        <OutfitGrid items={outfits} />
      )}
    </div>
  )
}

export default Home
