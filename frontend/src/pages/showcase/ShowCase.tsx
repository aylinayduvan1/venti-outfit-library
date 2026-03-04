import { useEffect } from 'react'
import OutfitCard from 'components/outfits/OutfitCard'
import { useOutfits } from 'context/OutfitContext'

function ShowCase() {
    const {loading, outfits, getMyOutfits} = useOutfits()
      useEffect(() => {
      getMyOutfits()
    }, [])

    if(loading) return <p>Yükleniyor..</p>
  return (
    <div className='grid
                    grid-cols-1
                    min-[430px]:grid-cols-2
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-6
                    gap-3
                    md:gap-4
                    w-[92%]
                    sm:w-4/5
                    mx-auto
                    justify-items-center'
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