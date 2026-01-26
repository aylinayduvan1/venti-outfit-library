import { createContext, useContext, useEffect, useState } from 'react'
import { outfits as initialOutfits } from '../data/outfits'
import type { Outfit } from '../types/outfit'

interface OutfitContextType {
  outfits: Outfit[]
  addOutfit: (outfit: Outfit) => void
}

const OutfitContext = createContext<OutfitContextType | null>(null)

export function OutfitProvider({ children }: { children: React.ReactNode }) {
  const [outfits, setOutfits] = useState<Outfit[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('outfits')
    if (stored) {
      setOutfits(JSON.parse(stored))
    } else {
      setOutfits(initialOutfits)
    }
  }, [])

  const addOutfit = (outfit: Outfit) => {
    setOutfits(prev => {
      const updated = [outfit, ...prev]
      localStorage.setItem('outfits', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <OutfitContext.Provider value={{ outfits, addOutfit }}>
      {children}
    </OutfitContext.Provider>
  )
}

export function useOutfits() {
  const ctx = useContext(OutfitContext)
  if (!ctx) throw new Error('useOutfits must be used inside OutfitProvider')
  return ctx
}
