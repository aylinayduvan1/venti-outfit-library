import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// 🚀 axios instance (token otomatik gider)
const api = axios.create({
  baseURL: "http://localhost:4000",
});

// 🔥 interceptor: her isteğe token ekler
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 📥 FAVORİLERİ ÇEK
  const fetchFavorites = async () => {
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data.map((item: any) => item._id || item));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // ❤️ TOGGLE FAVORITE
  const toggleFavorite = async (id: string) => {
    const isFav = favorites.includes(id);

    // optimistic UI
    setFavorites((prev) =>
      isFav ? prev.filter((f) => f !== id) : [...prev, id]
    );

    try {
      await api.post(`/favorites/${id}`);
    } catch (err) {
      console.error(err);
      fetchFavorites(); // rollback
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}