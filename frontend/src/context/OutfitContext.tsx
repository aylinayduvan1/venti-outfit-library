import { createContext, useContext, useEffect, useState } from 'react'
import type { Outfit } from '../types/outfit'
import type { OutfitCreateInput } from '../types/outfit-create'
import {fetchOutfits,createOutfit, deleteOutfit as deleteOutfitService} from '../services/outfit.service'

interface OutfitContextType {
  outfits: Outfit[]
  loading: boolean
  addOutfit: (input: OutfitCreateInput) => Promise<void>
  deleteOutfit: (id: string) => Promise<void>
}

const OutfitContext = createContext<OutfitContextType | null>(null)

export function OutfitProvider({ children }: { children: React.ReactNode }) {
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOutfits()
      .then(setOutfits)
      .finally(() => setLoading(false))
  }, [])

  const addOutfit = async (input: OutfitCreateInput) => {
    const newOutfit = await createOutfit(input)
    setOutfits(prev => [...prev, newOutfit])
  }

  const deleteOutfit = async(id:string) =>{
    await deleteOutfitService(id)
    setOutfits(prev => prev.filter(o => o._id !== id))
  }

  return (
    <OutfitContext.Provider value={{ outfits, loading, addOutfit, deleteOutfit }}>
      {children}
    </OutfitContext.Provider>
  )
}

export function useOutfits() {
  const ctx = useContext(OutfitContext)
  if (!ctx) {
    throw new Error('useOutfits must be used inside OutfitProvider')
  }
  return ctx
}
