import OutfitCard from '../components/OutfitCard'
import { useOutfits } from '../context/OutfitContext'

function ShowCase() {
    const {loading, outfits} = useOutfits()

    if(loading) return <p>Yükleniyor..</p>
  return (
    <div className='grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-5
                    xl:grid-cols-6
                    gap-4
                    w-4/5 
                    mx-auto'
    >
    {outfits.map(outfit =>(
            <OutfitCard 
            key={outfit._id}
            outfit={outfit} 
            showActions
            showFavorite={false}
        />
        ))}    
    </div>
  )
}

export default ShowCase