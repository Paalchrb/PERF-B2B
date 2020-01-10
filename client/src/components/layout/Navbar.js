import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      navbar
      <Link to='/'>
        Landingpage
      </Link>
      <Link to='/dashboard'>
        Dashboard
      </Link>
      <Link to='/login'>
        Login
      </Link>
    </div>
  )
}

export default Navbar;






