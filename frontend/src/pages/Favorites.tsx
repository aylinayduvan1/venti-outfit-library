import OutfitGrid from "../components/OutfitGrid"
import { useFavorites } from "../context/FavoritesContext"
import { useOutfits } from "../context/OutfitContext"
import './Favorites.css'

function Favorites() {
  const { favorites } = useFavorites()
  const {outfits} = useOutfits()

  const favoriteOutfits = outfits.filter(o =>
    favorites.includes(o._id)
  )

  if (favoriteOutfits.length === 0) {
    return (
        <div className="empty-state">
        <i className="pi pi-heart text-6xl opacity-50" />
        <p>Henüz favori eklemedin</p>
      </div>
    )
  }

  return  <div className="home-container">
            <OutfitGrid items={favoriteOutfits} />
          </div>
}

export default Favorites
