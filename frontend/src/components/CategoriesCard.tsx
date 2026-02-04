import type { Category } from '../types/categories'
import './CategoriesCard.css'

interface Props {
  categories: Category[]
  selectedCategory: string | null
  onSelect: (id: string) => void
}

function CategoriesCard({ categories, selectedCategory, onSelect }: Props) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex justify-center gap-4 min-w-max py-2">
        {categories.map(category => {
          const isActive = category._id === selectedCategory

          return (
            <div
              key={category._id}
              onClick={() => onSelect(category._id)}
              className={`
                img-container
                snap-start
                ${
                  isActive
                    ? 'ring-2 ring-purple-700 scale-105 shadow-lg shadow-purple-500/40'
                    : 'hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/30'
                }
              `}
            >
              <img
                src={category.image}
                className="img"
                alt={category.name}
              />

              <div className="cat-subtitle-container">
                <span className="cat-subtitle-content">
                  {category.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoriesCard
