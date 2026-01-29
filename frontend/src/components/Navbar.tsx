import './Navbar.css'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function Navbar() {
  const {favorites} = useFavorites();
  return (
    <div className='navbar-container'>
        <p className='text-2xl font-semibold title'>V E N T I : Outfit Kütüphanesi</p>
        <nav className='navbar'>
          <Link to="/" className="nav-link">
          <i className='pi pi-home text-base'/>
          <p className='link-name'>Anasayfa</p>
          </Link>
          <Link to="/favorites" className="nav-link">
            <div className="relative">
              <i className="pi pi-heart-fill text-base" />

              {favorites.length > 0 && (
                <span className="fav-badge">
                  {favorites.length}
                </span>
              )}
            </div>

            <p className="link-name">Favoriler</p>
          </Link>
          <Link to="/add" className='nav-link'>
          <i className='pi pi-plus text-base'/>
            <p className="link-name">Kombin Ekle</p>
          </Link>
          <Link to="/showcase" className='nav-link'>
          <i className='pi pi-building text-base'/>
            <p className="link-name">Vitrinim</p>
          </Link>
        </nav>
      </div>
  )
}

export default Navbar