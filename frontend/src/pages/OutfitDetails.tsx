import { useNavigate, useParams } from "react-router-dom"
import './OutfitDetail.css'
import { useFavorites } from "../context/FavoritesContext";
import { useOutfits } from "../context/OutfitContext";

function OutfitDetails() {
    const {id} = useParams();
    const navigate =useNavigate();
    const {isFavorite,toggleFavorite} = useFavorites();
    const {outfits, loading} = useOutfits()

    if (loading) return <p>Yükleniyor...</p>;

    const outfit = outfits.find(o => o._id === id);

    if(!outfit){
        debugger
        return <p className="text-purple-400">Kombin bulunamadı</p>
    }

  return (
    <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* SOL: Görsel */}
            <div className="w-full">
                <img
                    src={`http://localhost:4000${outfit.image}`}
                    alt={outfit.title}
                    className="detail-img"
                />
            </div>
        {/* SAĞ: Bilgiler */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-violet-900">
                    {outfit.title}
                </h1>
                <span className="category-tag">
                    #{outfit.category}
                </span>
                <p className="text-violet-700 leading-relaxed">
                    Bu kombin günlük kullanım için ideal. Şık ama rahat bir görünüm sunar.Sonradan dinamik yapı ile dinamik yapılacaktır.
                </p>
                {/* Favori / Aksiyon alanı */}
                <div className="flex gap-4 mt-4">
                    <button className="detail-fav-button"
                            onClick={()=>toggleFavorite(outfit._id)}>
                            <i className={`pi ${isFavorite(outfit._id) ? 'pi-heart-fill' : 'pi-heart'}`}/>
                    </button>
                    <button className="back-button" onClick={()=> navigate(-1)}>
                        Geri Dön
                    </button>
                </div>
            </div>

        </div>
    </div>

  )
}

export default OutfitDetails