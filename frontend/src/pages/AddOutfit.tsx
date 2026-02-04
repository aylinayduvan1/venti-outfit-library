import { useNavigate } from "react-router-dom"
import { useOutfits } from "../context/OutfitContext"
import OutfitForm, {type OutfitFormValues} from "../components/OutfitForm"

function AddOutfit() {
  const navigate = useNavigate()
  const { addOutfit } = useOutfits()

  const initialValues: OutfitFormValues = {
    title: "",
    description: "",
    categoryId: "",
    image: null,
    isPublic: false,
    tags:[]
  }

  const onSubmit = async (values: OutfitFormValues) => {
    await addOutfit(values)
    navigate('/showcase')
  }

  return (
    <OutfitForm
      initialValues={initialValues}
      submitText="Kaydet"
      onSubmit={onSubmit}
    />
  )
}

export default AddOutfit
