import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'


function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('')

  function handleInputChange(e) {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onSearch(newSearch);
  }

  return (
    <>
      <div className='search' data-testid="search-bar">
        <FaSearch /> 
        <input 
          role="searchbox"
          type="text" 
          placeholder='Busca' 
          value={search} 
          onChange={handleInputChange}
        />
      </div>
    </>
  )
}



export default SearchBar
