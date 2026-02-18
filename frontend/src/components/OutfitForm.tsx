import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./OutfitForm.css";
import { useCategories } from "../context/CategoryContext";
import { useTags } from "../context/TagContext";
import CreatableSelect from "react-select/creatable";


export interface OutfitFormValues {
  title: string;
  description: string;
  categoryId: string;
  image: File | null;
  isPublic: boolean;
  tags: { id: string; name: string }[];
}

interface Props {
  initialValues: OutfitFormValues;
  onSubmit: (values: OutfitFormValues) => Promise<void>;
  submitText?: string;
  initialImageUrl?: string;
}

const OutfitSchema = Yup.object({
  title: Yup.string()
    .min(3, "En az 3 karakter")
    .required("Başlık zorunlu"),

  description: Yup.string().max(300, "En fazla 300 karakter"),

  categoryId: Yup.string().required("Kategori seçmek zorunlu"),

  tags: Yup.array()
  .min(1, "En az 1 tag seçiniz.")
  .required("Tag seçiniz."),

  image: Yup.mixed<File>().nullable(),
});

function OutfitForm({
  initialValues,
  onSubmit,
  submitText = "Kaydet",
  initialImageUrl,
}: Props) {
  const [preview, setPreview] = useState<string | null>(
    initialImageUrl || null
  );

  const { categories } = useCategories();
  const { tags } = useTags(); // Tags context

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OutfitSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ setFieldValue, errors, touched, values }) => (
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

                <Field as="select" name="categoryId" className="add-input">
                  <option value="">Kategori seç</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="form-error"
                />

                {/* TAGS MULTI SELECT */}
                <CreatableSelect
                  isMulti
                  options={tags.map(tag => ({ value: tag._id, label: tag.name }))}
                  value={values.tags.map(t => ({ value: t.id, label: t.name }))}
                  onChange={(selectedOptions) => {
                    const newTags = selectedOptions?.map(option => ({
                      id: option?.value || '',  // eğer yoksa yeni tag
                      name: option?.label || ''
                    })) || [];
                    setFieldValue('tags', newTags);
                  }}
                  placeholder="Tag seç veya ekle"
                  styles={{ 
                  control: (provided, state) => ({ 
                    ...provided, 
                    borderRadius: '0.75rem', 
                    padding:'0.50rem', 
                    borderColor: state.isFocused ? '#ddd6fe' : '#ddd6fe', 
                    boxShadow: state.isFocused ? '0 0 0 2px rgba(139 ,92 ,246)' : 'none', 
                    '&:hover': { borderColor: '#fffff',
                    },}),
                  }}
                  />
                                                     

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
                      const file = e.currentTarget.files?.[0] || null;
                      setFieldValue("image", file);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={values.isPublic}
                    onChange={e =>
                      setFieldValue("isPublic", e.target.checked)
                    }
                  />
                  Gönderi herkese açık olsun
                </label>

                <div className="add-actions">
                  <button type="submit" className="btn-primary">
                    {submitText}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default OutfitForm;
