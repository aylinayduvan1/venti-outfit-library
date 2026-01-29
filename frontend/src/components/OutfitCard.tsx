import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useOutfits } from '../context/OutfitContext';
import type { Outfit } from '../types/outfit'
import './OutfitCard.css'
import Modal from './Modal';

interface Props {
    outfit: Outfit;
    onClick?: () => void
    showFavorite?: boolean
    showActions?: boolean
}

function OutfitCard({outfit, onClick, showFavorite = true, showActions = false}:Props) {
  const {toggleFavorite, isFavorite} = useFavorites();
  const {deleteOutfit} = useOutfits()
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="outfit-card-container"
          onClick={onClick}>
        <div className='w-full' style={{height:'240px'}}>
         <img src={`http://localhost:4000${outfit.image}`} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className='p-2 font-semibold text-violet-900 truncate'>{outfit.title}</div>
        <div className='p-2 text-violet-800 italic'>#{outfit.category}</div>

        {showFavorite && (
         <button
            onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(outfit._id)
            }}
            className="favorite-btn"
            >
            <i className={`pi ${
               isFavorite(outfit._id) ? 'pi-heart-fill favorite-active' : 'pi-heart favorite-passive'}`}
            />
            </button>
        )}

            {showActions && (
              <div className='action-btn-container'>
                <button className='btn-edit'>
                  <i className='pi pi-pen-to-square text-violet-600'/>
                </button>

                <button className='btn-delete'
                        onClick={(e) =>{e.stopPropagation()
                        setOpenModal(true)
                        }}                
                >
                  <i className='pi pi-trash text-rose-700'/>
                </button>

                <Modal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                >   
                <div className="w-56 h-60 mb-4 rounded-lg overflow-hidden shadow">
                  <img
                    src={`http://localhost:4000${outfit.image}`}
                    alt={outfit.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Bu kombin <span className="font-medium text-gray-800">
                  kalıcı olarak silinecektir.
                  </span>
                </p>

                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setOpenModal(false)}>
                      Vazgeç
                    </button>
                    <button
                      className="bg-rose-600 text-white px-6 py-2 ml-2 rounded-full"
                      onClick={() => {
                        deleteOutfit(outfit._id)
                        setOpenModal(false)
                      }}
                    >
                      Sil
                    </button>
                  </div>  
                </Modal>

              </div>

              
            )}
    </div> 
    )}

export default OutfitCard