import React from 'react'
import Nav from './Nav'
import SearchBar from './SearchBar'

function NavBar({onSearch}) {
  return (
    <div className='navbar' data-testid="navbar">
      <Nav />
      <SearchBar onSearch={onSearch} />
    </div>
  )
}

export default NavBar