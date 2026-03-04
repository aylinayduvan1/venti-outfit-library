import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'primeicons/primeicons.css'
import { FavoritesProvider } from './context/FavoritesContext'
import { OutfitProvider } from './context/OutfitContext'
import { CategoryProvider } from './context/CategoryContext'
import { TagProvider } from './context/TagContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <FavoritesProvider>
      <TagProvider>
      <CategoryProvider>
        <OutfitProvider>
          <App />
        </OutfitProvider>
      </CategoryProvider>
      </TagProvider>
    </FavoritesProvider>
    </AuthProvider>
  </BrowserRouter>
//</StrictMode>

)
