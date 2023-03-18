import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin } from 'react-icons/hi2'
import { HiPhone } from 'react-icons/hi2'
import { HiHeart } from 'react-icons/hi2'
import Modal from '../components/Modal'


function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [cep, setCep] = useState('');
  const [city, setCity] = useState(localStorage.getItem('city') || 'São Paulo');


  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };


  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleCepSubmit = async () => {
    try {
      if (!cep) {
        return;
      }
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://viacep.com.br/ws/${cep}/json/`)}`)
      // .then(response => response.json())
      // .then(data => console.log(data));
      const data = await response.json();
      const address = JSON.parse(data.contents)
      setCity(address.localidade);
      // console.log(localidade);
      handleCloseModal();
      localStorage.setItem('city', address.localidade);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <ul className='nav' data-testid="nav">
        <li className='nav__item'>
          <Link onClick={handleOpenModal}>
            <HiMapPin /> 
            <span>
            {city ? `Cidade: ${city}` : 'Cidade: São paulo'}
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
      {isOpen && 
        <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Informe seu CEP"
        content={
          <div className='modal__contentCep'>
            <p className='modal__textCep'>
              Para ficar por dentro dos produtos que possuem frete grátis para sua região!
            </p>
            <input className='modal__inputCep' type="text" placeholder='Insira aqui o CEP' onChange={handleCepChange} value={cep}/>
            <button 
              className='modal__btnActionCep'
              onClick={handleCepSubmit}
            >
              Consultar
            </button>
          </div>
        }
        /> 
      }
    </>
  )
}

export default Nav