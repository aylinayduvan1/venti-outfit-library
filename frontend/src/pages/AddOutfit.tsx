import { useNavigate } from "react-router-dom"
import { useOutfits } from "../context/OutfitContext"
import OutfitForm, {type OutfitFormValues} from "../components/OutfitForm"

function AddOutfit() {
  const navigate = useNavigate()
  const { addOutfit } = useOutfits()

  const initialValues: OutfitFormValues = {
    title: "",
    description: "",
    categoryId: 1,
    image: null,
  }

  return (
    <OutfitForm
      initialValues={initialValues}
      submitText="Kaydet"
      onSubmit={async (values) => {
        await addOutfit(values)
        navigate("/")
      }}
    />
  )
}

export default AddOutfit
