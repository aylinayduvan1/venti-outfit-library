import { useParams } from "react-router-dom"
import './OutfitDetail.css'
import { useFavorites } from "../../context/FavoritesContext";
import { useOutfits } from "../../context/OutfitContext";

function OutfitDetails() {
    const {id} = useParams();
    const {isFavorite,toggleFavorite} = useFavorites();
    const {outfits, loading} = useOutfits()

    if (loading) return <p>Yükleniyor...</p>;

    const outfit = outfits.find(o => o._id === id);

    if(!outfit){
        return <p className="text-purple-400">Kombin bulunamadı</p>
    }

  return (
    <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* SOL: Görsel */}
            <div className="w-full relative">
                <img
                    src={`http://localhost:4000${outfit.image}`}
                    alt={outfit.title}
                    className="detail-img"
                />

                 <p className="detail-username">
                   @{outfit.owner.username}
                </p>
            </div>
        {/* SAĞ: Bilgiler */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-violet-900">
                    {outfit.title} {outfit.isPublic === false ? ( 
                                        <i className='pi pi-lock'/>) : (
                                        <i className='pi pi-lock-open'/>
                                    )}
                </h1>
                
                <div className="flex gap-2 flex-wrap">
                    {(outfit.tags ?? []).map(tag => (
                        <span key={tag._id} className="category-tag">
                        #{tag.slug}
                        </span>
                    ))}
                </div>

                <p className="text-violet-700 leading-relaxed">
                    {outfit.description}
                </p>
                {/* Favori / Aksiyon alanı */}
                <div className="flex gap-4 mt-4">
                    <button className="detail-fav-button"
                            onClick={()=>toggleFavorite(outfit._id)}>
                            <i className={`pi ${isFavorite(outfit._id) ? 'pi-heart-fill' : 'pi-heart'}`}/>
                    </button>
                </div>
            </div>

        </div>
    </div>

  )
}

export default OutfitDetails