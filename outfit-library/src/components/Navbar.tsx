import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

interface Props{
  favorites:number[];
}

function Navbar({favorites}:Props) {
  return (
    <div className='navbar-container'>
        <p className='text-2xl font-semibold'>V E N T I : Outfit Kütüphanesi</p>
        <nav className='navbar'>
        <Link to="/" className="nav-link">
        <i className='pi pi-home text-base'/>
        <p className='text-base'>Anasayfa</p>
        </Link>

       <Link to="/favorites" className="nav-link">
  <div className="relative">
    <i className="pi pi-heart-fill text-base" />

    {favorites.length > 0 && (
      <span
        className="
          absolute
          -top-1.5
          -right-20
          bg-rose-600
          text-white
          text-xs
          w-5
          h-5
          flex
          items-center
          justify-center
          rounded-full
        "
      >
        {favorites.length}
      </span>
    )}
  </div>

  <p className="text-base">Favoriler</p>
</Link>

        </nav>
      </div>
  )
}

export default Navbar