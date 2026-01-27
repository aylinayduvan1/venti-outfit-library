import type { Outfit } from '../types/outfit'
import OutfitCard from './OutfitCard';
import './OutfitGrid.css';


interface Props{
    items: Outfit[];
}
function OutfitGrid({items}: Props) {
  return (
    <div className="grid-container">     
      {items.map(item => (
        <div key={item._id}>
          <OutfitCard 
            outfit={item}/>
        </div>
      ))}
    </div>
  )
}

export default OutfitGrid