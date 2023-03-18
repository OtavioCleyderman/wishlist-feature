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
  const [classe, setClasse] = useState('');

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

    const url = `https://viacep.com.br/ws/${cep}/json`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
          'content-type': 'application/json;charset=utf-8',
      }
  }
    try {
      if (!cep) {
        return;
      }
      const response = await fetch(url, options)
          const data = await response.json();
          const address = data.localidade
          setCity(address);
          handleCloseModal('city');
          localStorage.setItem('city', address);
    } catch (err) {
      const element = document.querySelector('.modal__message')
      element.classList.remove('modal__message--none')

      setTimeout(() => {
        element.classList.add('modal__message--none')
      }, 10000)
    
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
            <p className='modal__message modal__message--none'>
              Não foi possível encontrar a cidade com o CEP informado. Verifique o CEP correto e/ou tente novamente mais tarde.
            </p>
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
                <div>(11) 3028-5333</div>
                <div>(11) 3070-6888</div>
              </div>
              <div className='modal__regiao'>
                <div>Para Rio de Janeiro e região</div>
                <div>0800 888 8464</div>
                <div>Somente telefones fixos e locais</div>
              </div>
            </div>

            <div className="modal__vendas">
              <p>Central de vendas</p>
              <div className='modal__numeros'>
                <div>(11) 3028-5355</div>
                <div>(11) 3070-6999</div>
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