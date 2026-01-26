import { outfits } from "../data/outfits"
import { useNavigate, useParams } from "react-router-dom"
import './OutfitDetail.css'

interface Props {
    favorites:number[];
    onToggleFavorite: (id:number) => void
}

function OutfitDetails({favorites, onToggleFavorite}:Props) {
    const {id} = useParams();
    const navigate =useNavigate();

    const outfit = outfits.find(o =>o.id === Number(id));

    if(!outfit){
        return <p className="text-purple-400">Kombin bulunamadı</p>
    }

    const isFavorite = favorites.includes(outfit.id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* SOL: Görsel */}
            <div className="w-full">
                <img
                    src={outfit.image}
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
                            onClick={()=>onToggleFavorite(outfit.id)}>
                            <i className={`pi ${isFavorite ? 'pi-heart-fill' : 'pi-heart'}`}/>
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