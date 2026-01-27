import { useFavorites } from '../context/FavoritesContext';
import type { Outfit } from '../types/outfit'
import './OutfitCard.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    outfit: Outfit;
}
function OutfitCard({outfit}:Props) {
  const navigate = useNavigate()
  const {toggleFavorite, isFavorite} = useFavorites()
;
  return (
    <div className="outfit-card-container" 
    onClick={() => navigate(`/outfit/${outfit.id}`)}> 
        <div style={{width:'190px', height:'240px'}}>
         <img src={outfit.image} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className='p-2 font-semibold text-violet-900'>{outfit.title}</div>
        <div className='p-2 text-violet-800 italic'>#{outfit.category}</div>
         <button
            onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(outfit.id)
            }}
            className="favorite-btn"
            >
            <i className={`pi ${
               isFavorite(outfit.id) ? 'pi-heart-fill favorite-active' : 'pi-heart favorite-passive'}`}
            />
            </button>
    </div> 
    )}

export default OutfitCard