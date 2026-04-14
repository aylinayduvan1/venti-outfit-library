import OutfitGrid from "../../components/outfits/OutfitGrid"
import { useAuth } from "../../context/AuthContext"
import { useFavorites } from "../../context/FavoritesContext"
import { useOutfits } from "../../context/OutfitContext"
import { useEffect } from "react"
import './Favorites.css'

function Favorites() {
  const { favorites } = useFavorites()
  const { outfits, getMyOutfits } = useOutfits()
  const { user} = useAuth()

  // Mount olduğunda sadece kendi outfitlerini çekiyoruz
  useEffect(() => {
    getMyOutfits()
  }, [])

  // Sadece giriş yapan kullanıcının favorileri
  const favoriteOutfits = outfits.filter(o =>
    favorites.includes(o._id) &&
    o.ownerId === user?.id
  )

  if (favoriteOutfits.length === 0) {
    return (
      <div className="empty-state">
        <i className="pi pi-heart text-6xl opacity-50" />
        <p>Henüz favori eklemedin</p>
      </div>
    )
  }

  return (
    <div className="home-container">
      <OutfitGrid items={favoriteOutfits} />
    </div>
  )
}

export default Favorites