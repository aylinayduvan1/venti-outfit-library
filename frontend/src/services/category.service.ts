import axios from 'axios'
import type { Category } from '../types/categories'

const API_URL = 'http://localhost:4000/categories'

export async function fetchCategories(): Promise<Category[]> {
  const res = await axios.get<Category[]>(API_URL)
  return res.data
}
