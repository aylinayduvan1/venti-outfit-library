import { useState } from "react"
import "./AddOutfit.css"
import { useOutfits } from "../context/OutfitContext"
import { useNavigate } from "react-router-dom"
import { categories } from "../data/categories"

function AddOutfit() {
  const navigate = useNavigate()
  const { addOutfit } = useOutfits()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<number>(1)
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onloadend = () => {
    setImage(reader.result as string) // BASE64
  }

  reader.readAsDataURL(file)
}


  const handleSubmit = () => {
    if (!title || !image) return

    const category = categories.find(c => c.id === categoryId)
    if (!category || !category.key) return

    addOutfit({
      id: Date.now(),
      title,
      description,
      image: image!, // burada safe
      categoryId,
      category: category.key,
      tags: [],
      createdAt: new Date().toISOString()
    })

    navigate('/')
  }


  return (
    <div className="add-container">
      <div className="add-grid">
        {/* SOL */}
        <div className="add-image-box">
          {image ? (
            <img src={image} className="add-image" />
          ) : (
            <div className="add-image-placeholder">
              Görsel seçilmedi
            </div>
          )}
        </div>

        {/* SAĞ */}
        <div className="add-form">
         <input
            type="text"
            placeholder="Kombin adı"
            className="add-input title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />


         <select
            className="add-input"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories
              .filter(c => c.id !== 999)
              .map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
          </select>



          <textarea
            placeholder="Açıklama"
            className="add-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="add-file"
          />

          <div className="add-actions">
            <button className="btn-primary" onClick={handleSubmit}>
              Kaydet
            </button>

            <button className="btn-secondary" onClick={() => navigate(-1)}>
              İptal
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddOutfit
