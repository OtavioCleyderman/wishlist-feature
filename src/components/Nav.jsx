import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin } from 'react-icons/hi2'
import { HiPhone } from 'react-icons/hi2'
import { HiHeart } from 'react-icons/hi2'
import Modal from '../components/Modal'


function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCityModal, setIsOpenCityModal] = useState(false);
const [isOpenCentralModal, setIsOpenCentralModal] = useState(false);
  const [cep, setCep] = useState('');
  const [city, setCity] = useState(localStorage.getItem('city') || 'São Paulo');


  const handleOpenModal = (modalType) => {
    if (modalType == 'city') {
      setIsOpenCityModal(true);
    } else if (modalType == 'contact') {
      setIsOpenCentralModal(true);
    }
  };

  const handleCloseModal = (modalType) => {
    if (modalType == 'city') {
      setIsOpenCityModal(false);
    } else if (modalType == 'contact') {
      setIsOpenCentralModal(false);
    }
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
          <Link onClick={() => handleOpenModal('city')} >
            <HiMapPin /> 
            <span>
            {city ? `Cidade: ${city}` : 'Cidade: São paulo'}
            </span>
          </Link>
        </li>
        <li className='nav__item'>
          <Link onClick={() => handleOpenModal('contact')} >
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
      {isOpenCityModal  && 
        <Modal
        isOpen={isOpenCityModal}
        onClose={() => setIsOpenCityModal(false)}
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
      {isOpenCentralModal  && 
        <Modal
        isOpen={isOpenCentralModal }
        onClose={() => setIsOpenCentralModal(false)}
        title="Centrais de atendimento"
        content={
          <div className='modal__content'>
          <div className='modal__canais'>
            <div className="modal__atendimento">
              <p>Atendimento</p>
              <div className='modal__numeros'>
                <span>(11) 3028-5333</span>
                <span>(11) 3070-6888</span>
              </div>
              <div className='modal__regiao'>
                <span>Para Rio de Janeiro e região</span>
                <span>0800 888 8464</span>
                <span>Somente telefones fixos e locais</span>
              </div>
            </div>

            <div className="modal__vendas">
              <p>Central de vendas</p>
              <div className='modal__numeros'>
                <span>(11) 3028-5355</span>
                <span>(11) 3070-6999</span>
              </div>
            </div>
          </div>
        </div>
        }
        /> 
      }
    </>
  )
}

export default Nav