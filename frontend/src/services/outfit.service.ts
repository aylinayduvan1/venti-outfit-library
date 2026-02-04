import axios from 'axios'
import type { Outfit } from '../types/outfit'
import type { OutfitCreateInput } from '../types/outfit-create'
import type { OutfitFormValues } from '../components/OutfitForm'

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
  formData.append('category', input.categoryId)
  formData.append('isPublic', String(input.isPublic))
  formData.append('tags', JSON.stringify(input.tags))


  if (input.image) {
    formData.append('image', input.image)
  }

  const res = await axios.post<Outfit>(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export async function deleteOutfit(id: string): Promise<void>{
  await axios.delete(`${API_URL}/${id}`)
}

export async function updateOutfit(
  id: string,
  input: OutfitFormValues
): Promise<Outfit> {
  const formData = new FormData()

  formData.append("title", input.title)
  formData.append("description", input.description)
  formData.append("category", input.categoryId)
  formData.append('isPublic', String(input.isPublic))
  formData.append('tags', JSON.stringify(input.tags))



  if (input.image) {
    formData.append("image", input.image)
  }

  const res = await axios.put<Outfit>(
    `${API_URL}/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  )

  return res.data
}

export async function getMyOutfitsService(): Promise<Outfit[]> {
  const res = await axios.get<Outfit[]>(API_URL)
  return res.data
}

export async function fetchPublicOutfits(
  categoryId: string | null
): Promise<Outfit[]> {
  let url = `${API_URL}?public=true`

  if (categoryId && categoryId !== '999') {
    url += `&category=${categoryId}`
  }

  const res = await axios.get<Outfit[]>(url)
  return res.data
}

