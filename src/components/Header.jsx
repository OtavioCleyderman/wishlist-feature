import React from 'react'

import Logo from './Logo'
import NavBar from './NavBar'


function Header({onSearch}) {
  return (
    <div className='header'>
      <Logo />
      <NavBar onSearch={onSearch}/>
    </div>
  )
}

export default Header
