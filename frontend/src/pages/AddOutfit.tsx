import { useState } from "react"
import "./AddOutfit.css"
import { useNavigate } from "react-router-dom"
import { categories } from "../data/categories"
import { useOutfits } from "../context/OutfitContext"

function AddOutfit() {
  const navigate = useNavigate()
  const {addOutfit} = useOutfits()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<number>(1)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  const handleSubmit = async () => {
  if (!title || !file) return alert("Başlık ve görsel gerekli!");

  const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categoryId', categoryId.toString());
    formData.append('image', file);

    await addOutfit(formData);
    navigate('/');
  };

  return (
    <div className="add-container">
      <div className="add-grid">
        {/* SOL */}
        <div className="add-image-box">
          {file ? (
            <img src={URL.createObjectURL(file)} className="add-image" />
          ) : (
            <div className="add-image-placeholder">Görsel seçilmedi</div>
          )}
        </div>

        {/* SAĞ */}
        <div className="add-form">
          <input
            type="text"
            placeholder="Kombin adı"
            className="add-input title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <select
            className="add-input"
            value={categoryId}
            onChange={e => setCategoryId(Number(e.target.value))}
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
            onChange={e => setDescription(e.target.value)}
          />

          <label className="custom-upload">
           <i className="pi pi-cloud-upload mr-2"/>
            Fotoğraf Yükle
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

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
