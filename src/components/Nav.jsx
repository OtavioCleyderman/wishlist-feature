import React from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { HiPhone } from 'react-icons/hi2'
import { HiHeart } from 'react-icons/hi2'

function Nav() {
  return (
      <ul className='nav'>
        <li className='nav__item'>
          <a href="#">
            <HiMapPin /> 
            <span>
              Cidade: São Paulo
            </span>
          </a>
        </li>
        <li className='nav__item'>
          <a href="#">
            <HiPhone /> 
            <span>
              Central de atendimento
            </span>
          </a>
        </li>
        <li className='nav__item'>
          <a href="#">
            <HiHeart /> 
            <span>
              Lista de desejos
            </span>
          </a>
        </li>
      </ul>
  )
}

export default Nav