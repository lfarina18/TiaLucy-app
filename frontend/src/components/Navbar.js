import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='nav-menu'>
      <NavLink
        exact
        className='nav-item btn__nav'
        activeClassName='btn__nav--active'
        to='/'>
        Home
      </NavLink>
      <NavLink
        className='nav-item btn__nav'
        activeClassName='btn__nav--active'
        to='/nosotros'>
        Nosotros
      </NavLink>
      <NavLink
        className='nav-item btn__nav'
        activeClassName='btn__nav--active'
        to='/galeria'>
        Galería
      </NavLink>
      <NavLink
        className='nav-item btn__nav'
        activeClassName='btn__nav--active'
        to='/contacto'>
        Contacto
      </NavLink>
    </nav>
  );
}
