import { useEffect } from 'react'
import OutfitCard from 'components/outfits/OutfitCard'
import { useOutfits } from 'context/OutfitContext'
import ProfileCard from './ProfileCard'

function ShowCase() {
  const { loading, outfits, getMyOutfits } = useOutfits();

  useEffect(() => {
    getMyOutfits();
  }, []);

  if (loading) return <p>Yükleniyor..</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-[92%] sm:w-4/5 mx-auto mt-6">
      
      {/* 🟣 PROFIL (üstte mobilde) */}
      <div className="order-1 lg:order-2 lg:col-span-3">
        <ProfileCard />
      </div>

      {/* 🟣 OUTFIT GRID */}
      <div className="order-2 lg:order-1 lg:col-span-9 grid
        grid-cols-1
        min-[430px]:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-3
        xl:grid-cols-4
        gap-3 md:gap-4
        justify-items-center"
      >
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit._id}
            outfit={outfit}
            showActions
            showFavorite={false}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowCase