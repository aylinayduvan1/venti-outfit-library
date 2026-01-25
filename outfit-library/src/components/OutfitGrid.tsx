import React from 'react'
import type { Outfit } from '../types/outfit'
import OutfitCard from './OutfitCard';
import './OutfitGrid.css';


interface Props{
    items: Outfit[];
    favorites:number[];
    onToggleFavorites: (id: number) => void;
}

function OutfitGrid({items, favorites, onToggleFavorites}: Props) {
  return (
    <div className="grid-container">     
   {items.map(item => (
    <div key={item.id}>
      <OutfitCard outfit={item} isFavorite={favorites.includes(item.id)} onToggleFavorite={onToggleFavorites}/>
    </div>
  ))}

    </div>
  )
}

export default OutfitGrid