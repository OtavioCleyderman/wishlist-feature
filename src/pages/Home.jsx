import React from 'react'
import Header from '../components/Header'
import { useRequestApi } from '../hooks/useRequestApi'

function home() {
  const { data: products, isRequest } = useRequestApi('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')

  return (
    <>
      <Header />
      <ul>
        {isRequest && <p> Carregando... </p> }
        {products?.map(product => {
          return (
            <li key={product.id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default home
