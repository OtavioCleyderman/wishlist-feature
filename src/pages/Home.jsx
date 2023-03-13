import React from 'react'
import Header from '../components/Header'
import { useRequestApi } from '../hooks/useRequestApi'
import { AiFillHeart } from 'react-icons/ai'

function home() {
  const { data: products, isRequest } = useRequestApi('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')

  return (
    <>
      <Header />
      <main className='container'>
        <span>Home</span>
        <div className="cards">
          {isRequest && <p> Carregando... </p> }
          {products?.map(product => {
            return (
              <div className="cards__item" key={product.id}>
                <div className="cards__fav"><AiFillHeart /></div>
                <span className="cards__id" style={{display: "none"}}>{product.id}</span>
                <div className="cards__image">
                  <img src={product.image} alt="" />
                </div>
                <div className="cards__title">
                  {product.title}
                </div>
                <div className="cards__price">
                  R$ {product.price.toFixed(2)}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export default home

/* 

        {isRequest && <p> Carregando... </p> }
        {products?.map(product => {
          return (
            <li key={product.id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
            </li>
          )
        })}

*/