import type { Outfit } from '../types/outfit'
import './OutfitCard.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    outfit: Outfit;
    isFavorite:boolean;
    onToggleFavorite: (id:number) => void
}
function OutfitCard({outfit, isFavorite,onToggleFavorite}:Props) {
  const navigate = useNavigate()

  return (
    <div className="outfit-card-container" 
    onClick={() => navigate(`/outfit/${outfit.id}`)}> 
        <div style={{width:'180px', height:'250px'}}>
         <img src={outfit.image} alt="" className="w-full h-full object-top"/>
        </div>
        <div className='p-2 font-semibold text-violet-900'>{outfit.title}</div>
        <div className='p-2 text-violet-800 italic'>#{outfit.category}</div>
         <button
            onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(outfit.id)
            }}
            className="favorite-btn"
            >
            <i
                className={`pi ${
                isFavorite ? 'pi-heart-fill favorite-active' : 'pi-heart favorite-passive'
                }`}
            />
            </button>
    </div> 
    )}

export default OutfitCard