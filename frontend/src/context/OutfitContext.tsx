import { createContext, useContext, useEffect, useState } from 'react'
import type { Outfit } from '../types/outfit'
import type { OutfitCreateInput } from '../types/outfit-create'
import {fetchOutfits,
        createOutfit, 
        getMyOutfitsService,
        deleteOutfit as deleteOutfitService,
        updateOutfit as updateOutfitService, 
        fetchPublicOutfits as fetchPublicOutfitsService} 
  from '../services/outfit.service'
import type { OutfitFormValues } from '../components/outfits/OutfitForm'

interface OutfitContextType {
  outfits: Outfit[]
  loading: boolean
  getMyOutfits: () => Promise<void> 
  addOutfit: (input: OutfitCreateInput) => Promise<void>
  deleteOutfit: (id: string) => Promise<void>
  updateOutfit: (id: string, input: OutfitFormValues) => Promise<void>
  fetchPublicOutfits: (categoryId: string | null) => Promise<void>
}

const OutfitContext = createContext<OutfitContextType | null>(null)

export function OutfitProvider({ children }: { children: React.ReactNode }) {
  const [outfits, setOutfits] = useState<Outfit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchPublicOutfitsService('999')
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

const getMyOutfits = async () => {
  setLoading(true)
  const data = await getMyOutfitsService() // artık token header var
  setOutfits(data)
  setLoading(false)
}

const fetchPublicOutfits = async (categoryId: string | null) => {
  setOutfits([]);
  setLoading(true)
  const data = await fetchPublicOutfitsService(categoryId)
  setOutfits(data)
  setLoading(false)
}


  return (
    <OutfitContext.Provider value={{ outfits, loading, addOutfit, deleteOutfit, updateOutfit, getMyOutfits, fetchPublicOutfits }}>
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
