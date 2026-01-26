import type { Outfit } from '../types/outfit'
import OutfitCard from './OutfitCard';
import './OutfitGrid.css';
import { useFavorites } from '../context/FavoritesContext'


interface Props{
    items: Outfit[];
}

function OutfitGrid({items}: Props) {
  const {favorites, toggleFavorite} = useFavorites();
  return (
    <div className="grid-container">     
      {items.map(item => (
        <div key={item.id}>
          <OutfitCard 
            outfit={item} 
            isFavorite={favorites.includes(item.id)} 
            onToggleFavorite={toggleFavorite}/>
        </div>
      ))}
    </div>
  )
}

export default OutfitGrid