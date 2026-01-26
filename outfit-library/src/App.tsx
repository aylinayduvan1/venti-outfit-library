import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import OutfitDetails from './pages/OutfitDetails'
import AddOutfit from './pages/AddOutfit'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path='/outfit/:id' element={<OutfitDetails/>}/>
        <Route path='/add' element={<AddOutfit/>}/>
      </Routes>
    </>
  )
}

export default App
