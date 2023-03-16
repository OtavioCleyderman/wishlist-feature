import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useRequestApi } from '../services'


function SearchBar() {
  // const { data } = useRequestApi('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
  const [search, setSearch] = useState('')
 

  return (
    <>
      {/* <input type="text" />  */}
      <div className='search'>
        <FaSearch /> <input type="text" placeholder='Busca' value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </>
  )
}

export default SearchBar
