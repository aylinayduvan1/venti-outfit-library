import { createContext, useContext, useEffect, useState } from 'react'
import type { Outfit } from '../types/outfit'
import type { OutfitCreateInput } from '../types/outfit-create'
import {fetchOutfits,
        createOutfit, 
        deleteOutfit as deleteOutfitService,
        updateOutfit as updateOutfitService } 
  from '../services/outfit.service'
import type { OutfitUpdateInput } from '../types/outfit-update'
import type { OutfitFormValues } from '../components/OutfitForm'

interface OutfitContextType {
  outfits: Outfit[]
  loading: boolean
  addOutfit: (input: OutfitCreateInput) => Promise<void>
  deleteOutfit: (id: string) => Promise<void>
  updateOutfit: (id: string, input: OutfitFormValues) => Promise<void>
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

const updateOutfit = async (id: string, input: OutfitFormValues) => {
  const updated = await updateOutfitService(id, input)

  setOutfits(prev =>
    prev.map(o => (o._id === id ? updated : o))
  )
}


  return (
    <OutfitContext.Provider value={{ outfits, loading, addOutfit, deleteOutfit, updateOutfit }}>
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
