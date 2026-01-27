import { createContext, useContext, useEffect, useState } from 'react'
import type { Outfit } from '../types/outfit'
import axios from "axios"

interface OutfitContextType {
  outfits: Outfit[]
  loading: boolean
  addOutfit: (formData: FormData) => Promise<void>
}

const OutfitContext = createContext<OutfitContextType | null>(null)

export function OutfitProvider({ children }: { children: React.ReactNode }) {
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOutfits = async () => {
      try {
        const res = await fetch("http://localhost:4000/outfits")
        const data: Outfit[] = await res.json()
        setOutfits(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false) // veri geldiğinde loading kapansın
      }
    }

  useEffect(() => {
    fetchOutfits()
  }, [])

const addOutfit = async (formData: FormData) => {
  try {
    const res = await axios.post('http://localhost:4000/outfits', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const newOutfit: Outfit = res.data; // response'u Outfit tipine çevirdim.
    setOutfits(prev => [...prev, newOutfit]);
  } catch (err) {
    console.error('Add outfit error:', err);
  }
};




  return (
    <OutfitContext.Provider value={{ outfits, addOutfit, loading }}>
      {children}
    </OutfitContext.Provider>
  )
}

export function useOutfits() {
  const ctx = useContext(OutfitContext)
  if (!ctx) throw new Error('useOutfits must be used inside OutfitProvider')
  return ctx
}
