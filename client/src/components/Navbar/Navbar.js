import React from 'react'
import "./Navbar.css"

export const Navbar = () => {
  return (
    <div className='navbar'>
    <div id='itemCompliance'><a href="#" className='nav-item' >Compliance Centre</a></div>
    <div><a href="#" className='nav-item'>Projects</a></div>
    <div><a href="#" className='nav-item'>Report Groups</a></div>
    <div><a href="#" className='nav-item'>Users</a></div>
    <div><a href="#" className='nav-item'>Help</a></div>
    <div><a href="#" className='nav-item'>My profile</a></div>
    <div className="navbarLogout"><a href="#" className='nav-item' >Logout</a></div>
  </div>
  )
}
