import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useRequestApi } from '../services'
import { AiFillHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function home() {
  const { data, isRequest } = useRequestApi('https://run.mocky.io/v3/66063904-d43c-49ed-9329-d69ad44b885e')
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || [])
  const [products, setProducts] = useState(data)
  const [search, setSearch] = useState('')
  
  const filteredProducts = search
    ? products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    : products;


  useEffect(() => {
    // Atualiza os ícones de favorito na lista de produtos
    if (data && favorites) {
      const updatedProducts = data.map(product => {
        const isFavorite = favorites.some(favorite => favorite.id == product.id)
        return { ...product, isFavorite }
      })
      setProducts( updatedProducts)
    }
  }, [data])

  function handleClick(e) {
    const id = e.target.closest('.cards__item').querySelector('.cards__id').textContent;

    const product = products.find(product => product.id == id);
 

    if (!product) return; // Produto não encontrado na lista apensa não realizada nada
  
    const isFavorite = favorites.some(favorite => favorite.id == id);


    if (isFavorite) {
      // Remove dos favoritos
      setFavorites(favorites.filter(favorite => favorite.id != id));
   
    } else {
      // Adiciona aos favoritos
      const id = product.id
      const image = product.image
      const title = product.title
      const price = product.price
      const favoritedProduct = {id, image, title, price, isFavorite: true};
      setFavorites([...favorites, favoritedProduct]);
    }

    // Atualiza a cor do ícone de favorito
    const svg = e.target.closest('.cards__fav').querySelector('svg');
    svg.setAttribute('fill', isFavorite ? 'white' : 'red');

  }

 
  localStorage.setItem('wishlist', JSON.stringify(favorites))
  

  return (
    <>
      <Header onSearch={setSearch}/>
      <main className='container'>
        <Link to={'/'}>
          <span>
            Home
          </span>
        </Link>
        <div className="cards">
          {isRequest && <p data-testid="loading-spinner"> Carregando... </p> }
          {filteredProducts?.map(product => {
            return (
              <div className="cards__item home" key={product.id}>
                <div className="cards__fav"  >
                  <AiFillHeart role="addWishlist" data-testid="fav-icon" fill={product.isFavorite ? 'red' : 'white'} onClick={handleClick} />
                </div>  
                <div className="cards__id" style={{display: "none"}}>{product.id}</div>
                <div className="cards__image">
                  <img src={product.image} alt="" />
                </div>
                <div className="cards__title">
                  {product.title}
                </div>
                <div className="cards__price">
                  R$ {product.price}
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
