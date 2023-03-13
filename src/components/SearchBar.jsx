import React from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  return (
    <>
      {/* <input type="text" />  */}
      <div className='search'>
        <FaSearch /> <input type="text" placeholder='Busca'/>
      </div>
    </>
  )
}

export default SearchBar
