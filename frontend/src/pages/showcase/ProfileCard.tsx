import { useAuth } from "context/AuthContext";
import { useFavorites } from "context/FavoritesContext";
import { useOutfits } from "context/OutfitContext";

function ProfileCard() {
  const { user, logout } = useAuth();
  const {outfits} = useOutfits();
  const { favorites } = useFavorites()

   const favoriteOutfits = outfits.filter(o =>
    favorites.includes(o._id) &&
    o.ownerId === user?.id
  )

  return (
    <div className="bg-white rounded-2xl shadow-md p-5  mt-4 sticky">
      
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-violet-200 flex items-center justify-center text-2xl font-bold text-violet-700 mx-auto">
        {user?.name.charAt(0)}
      </div>

      {/* Info */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">
          {user?.name} {user?.surname}
        </h2>
        <p className="text-sm text-gray-500">@{user?.username}</p>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-6 text-center">
        <div>
          <p className="font-semibold">{outfits.length}</p>
          <span className="text-xs text-gray-500">Outfit</span>
        </div>

        <div>
          <p className="font-semibold">{favoriteOutfits.length}</p>
          <span className="text-xs text-gray-500">Favori</span>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 w-full bg-violet-900 text-white py-2 rounded-xl hover:bg-violet-950 transition">
        Profili Düzenle
      </button>

      <button className="mt-6 w-full border-2 border-solid border-red-800 text-red-800  hover:text-white py-2 rounded-xl hover:bg-red-800 transition"
      onClick={logout}
      >
        Çıkış yap
      </button>
    </div>
  );
}

export default ProfileCard;