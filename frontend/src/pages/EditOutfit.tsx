import { useNavigate, useParams } from 'react-router-dom'
import { useOutfits } from '../context/OutfitContext'
import OutfitForm, { type OutfitFormValues } from '../components/OutfitForm'
import { useEffect } from 'react'
import { fetchTags } from '../services/tag.service'

function EditOutfit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { outfits, updateOutfit } = useOutfits()

    const outfit = outfits.find(o => o._id == id)
    
    if(!outfit){return <p>Yükleniyor..</p>}

    const categoryId =
    typeof outfit.category === 'string'
      ? outfit.category
      : outfit.category?._id ?? ''


     const initialValues: OutfitFormValues = {
        title: outfit.title,
        description: outfit?.description ?? '',
        categoryId,
        image: null, // edit’te zorunlu değil
        isPublic: outfit.isPublic,
        tags: outfit.tags ? outfit.tags.map(t => t._id) : []
      }

    const handleSubmit= async (values: OutfitFormValues) =>{
        await updateOutfit(outfit._id, values)
        navigate(`/outfit/${outfit._id}`)
      }
  return (
    <OutfitForm
      initialValues={initialValues}
      submitText="Güncelle"
      onSubmit={handleSubmit}
      initialImageUrl={`http://localhost:4000${outfit.image}`}
    />  )
}

export default EditOutfit