import React from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin } from 'react-icons/hi2'
import { HiPhone } from 'react-icons/hi2'
import { HiHeart } from 'react-icons/hi2'

function Nav() {
  return (
      <ul className='nav' data-testid="nav">
        <li className='nav__item'>
          <Link to="">
            <HiMapPin /> 
            <span>
              Cidade: São Paulo
            </span>
          </Link>
        </li>
        <li className='nav__item'>
          <Link to="">
            <HiPhone /> 
            <span>
              Central de atendimento
            </span>
          </Link>
        </li>
        <li className='nav__item'>
          <Link to="/wishlist-page">
            <HiHeart /> 
            <span>
              Lista de desejos
            </span>
          </Link>
        </li>
      </ul>
  )
}

export default Nav