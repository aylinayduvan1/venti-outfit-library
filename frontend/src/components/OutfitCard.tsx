import { useEffect, useRef, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useOutfits } from '../context/OutfitContext';
import type { Outfit } from '../types/outfit'
import './OutfitCard.css'
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

interface Props {
    outfit: Outfit;
    onClick?: () => void
    showFavorite?: boolean
    showActions?: boolean
}

function OutfitCard({outfit, onClick, showFavorite = true, showActions = false}:Props) {
  const {toggleFavorite, isFavorite} = useFavorites();
  const {deleteOutfit} = useOutfits()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event:MouseEvent){
      if(
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ){
        setMenuOpen(false)
      }
    }
    if(menuOpen){
      document.addEventListener('mousedown',handleClickOutside)
    }

    return()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[menuOpen])

  return (
    <div className="outfit-card-container"
        onClick={() => navigate(`/outfit/${outfit._id}`)}>
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
                <button onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen(prev => !prev)
                }}>
                  <i className='pi pi-ellipsis-v btn-ellipsis'/>
                </button>
              <div>

              {/* MINI MENU */}
                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute top-12 right-0 z-20 w-30 rounded-md action-btn-container "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn-detail"
                      onClick={() => navigate(`/outfit/${outfit._id}`)}
                    >
                    <i className='pi pi-info-circle'/>
                    </button>

                    <button
                      className=" btn-edit"
                      onClick={() => navigate(`/outfit/${outfit._id}?edit=true`)}
                    >
                    <i className='pi pi-pen-to-square'/>
                    </button>

                    <button
                      className=" btn-delete"
                      onClick={() => {
                        setShowDeleteModal(true)
                        setMenuOpen(false)
                      }}
                    >
                    <i className='pi pi-trash'/>

                    </button>
                  </div>
                )}

                </div>
                <Modal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
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
                      <button onClick={() => setShowDeleteModal(false)}>
                        Vazgeç
                      </button>
                      <button
                        className="bg-rose-600 text-white px-6 py-2 ml-2 rounded-full"
                        onClick={() => {
                          deleteOutfit(outfit._id)
                          setShowDeleteModal(false)
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