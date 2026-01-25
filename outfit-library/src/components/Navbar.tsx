import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar-container'>
        <p className='text-2xl font-semibold'>V E N T I : Outfit Kütüphanesi</p>
        <nav className='navbar'>
        <NavLink to="/" className="nav-link">
        <i className='pi pi-home text-base'/>
        <p className='text-base'>Anasayfa</p>
        </NavLink>

        <NavLink to="/favorites" className="nav-link">
        <i className='pi pi-heart-fill text-base'/>
        <p className='text-base'>Favoriler</p>
        </NavLink>
        </nav>
      </div>
  )
}

export default Navbar