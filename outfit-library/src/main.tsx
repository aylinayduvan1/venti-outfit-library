import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'primeicons/primeicons.css'
import { FavoritesProvider } from './context/FavoritesContext'
import { OutfitProvider } from './context/OutfitContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <OutfitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OutfitProvider>
    </FavoritesProvider>
  </StrictMode>
)
