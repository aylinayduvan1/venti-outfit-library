import axios from 'axios'
import type { Outfit } from '../types/outfit'
import type { OutfitCreateInput } from '../types/outfit-create'

const API_URL = 'http://localhost:4000/outfits'

export async function fetchOutfits(): Promise<Outfit[]> {
  const res = await axios.get<Outfit[]>(API_URL)
  return res.data
}

export async function createOutfit(
  input: OutfitCreateInput
): Promise<Outfit> {
  const formData = new FormData()

  formData.append('title', input.title)
  formData.append('description', input.description ?? '')
  formData.append('categoryId', input.categoryId.toString())

  if (input.image) {
    formData.append('image', input.image)
  }

  const res = await axios.post<Outfit>(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}
