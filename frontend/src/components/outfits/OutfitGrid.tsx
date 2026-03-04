import { useNavigate } from 'react-router-dom';
import type { Outfit } from '../../types/outfit'
import OutfitCard from './OutfitCard';
import './OutfitGrid.css';

interface Props{
    items: Outfit[];
}
function OutfitGrid({items}: Props) {
    const navigate = useNavigate()
  return (
    <div className="grid-container">     
      {items.map(item => (
        <div key={item._id} className='flex justify-center'>
          <OutfitCard 
            outfit={item}
              onClick={() => navigate(`/outfit/${item._id}`)}
/>
        </div>
      ))}
    </div>
  )
}

export default OutfitGrid