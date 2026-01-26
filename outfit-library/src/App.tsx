import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import OutfitDetails from './pages/OutfitDetails'
import { useEffect, useState } from 'react'

function App() {
    const [favorites, setFavorites] = useState<number[]>([])

     const toggleFavorite = (id: number) => {
        setFavorites(prev => {
          const updated = prev.includes(id)
            ? prev.filter(favId => favId !== id)
            : [...prev, id]
    
          localStorage.setItem('favorites', JSON.stringify(updated))
          return updated
        })
      }

       useEffect(() => {
          const stored = localStorage.getItem('favorites')
          if (stored) {
            setFavorites(JSON.parse(stored))
          }
        }, [])

  return (
    <>
      <Navbar favorites={favorites}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path='/outfit/:id' element={<OutfitDetails favorites={favorites} onToggleFavorite={toggleFavorite}/>}/>
      </Routes>
    </>
  )
}

export default App
