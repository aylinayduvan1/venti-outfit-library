import { useState } from "react"
import "./AddOutfit.css"
import { useNavigate } from "react-router-dom"
import { categories } from "../data/categories"
import { useOutfits } from "../context/OutfitContext"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

export interface AddOutfitFormValues {
  title: string
  description: string
  categoryId: number
  image: File | null
}


const OutfitSchema = Yup.object({
  title: Yup.string()
    .min(3, "En az 3 karakter")
    .required("Başlık zorunlu"),

  description: Yup.string()
    .max(300, "En fazla 300 karakter"),

  categoryId: Yup.number().required(),

  image: Yup.mixed<File>()
    .required("Görsel zorunlu"),
})

function AddOutfit() {
  const navigate = useNavigate()
  const { addOutfit } = useOutfits()
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        categoryId: 1,
        image: null as File | null,
      }}
      validationSchema={OutfitSchema}
      onSubmit={async (values) => {
        await addOutfit(values)
        navigate('/')
      }}
    >
      {({ setFieldValue,errors,touched }) => (
        <Form>
          <div className="add-container">
            <div className="add-grid">

              {/* SOL */}
              <div className="add-image-box">
                {preview ? (
                  <img src={preview} className="add-image" />
                ) : (
                  <div className="add-image-placeholder">
                    Görsel seçilmedi
                  </div>
                )}
                <ErrorMessage
                  name="image"
                  component="div"
                  className="form-error"
                />
              </div>

              {/* SAĞ */}
              <div className="add-form">
                <div>
                  <Field
                  name="title"
                  placeholder="Kombin adı"
                  className={`add-input title ${
                    errors.title && touched.title ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="form-error"
                />

                </div>
                <Field
                  as="select"
                  name="categoryId"
                  className="add-input"
                >
                  {categories
                    .filter(c => c.id !== 999)
                    .map(c => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                </Field>

                <Field
                  as="textarea"
                  name="description"
                  placeholder="Açıklama"
                  className="add-textarea"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="form-error"
                />

                <label className="custom-upload">
                  <i className="pi pi-cloud-upload mr-2" />
                  Fotoğraf Yükle
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] || null
                      setFieldValue("image", file)

                      if (file) {
                        setPreview(URL.createObjectURL(file))
                      }
                    }}
                  />
                </label>

                <div className="add-actions">
                  <button type="submit" className="btn-primary">
                    Kaydet
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    İptal
                  </button>
                </div>

              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddOutfit
