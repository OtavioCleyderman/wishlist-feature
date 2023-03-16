import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useRequestLocalStorage } from '../services'
import { TiDeleteOutline } from 'react-icons/ti'

const WishlistPage = () => {
  const { data: favorites } = useRequestLocalStorage('wishlist')
  const [wishlist, setWishlist] = useState(favorites)

  useEffect(() => {
    setWishlist(favorites)
  }, [favorites])

  function handleClick(e) {
    const id = e.target.closest('.cards__item').querySelector('.cards__id').textContent
    const updatedWishlist = wishlist.filter(favorite => favorite.id != id)
    setWishlist(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  
  function returnWishlist(favorites){
    return (
      favorites?.map(favorite => (
          <div className="cards__item wishlist" key={favorite.id}>
            <div className="cards__fav wishlist" onClick={handleClick}>
              <TiDeleteOutline  />
            </div>
            <span className="cards__id" style={{display: "none"}}>{favorite.id}</span>
            <div className="cards__image">
              <img src={favorite.image} alt="" />
            </div>
            <div className="cards__title">
              {favorite.title}
            </div>
            <div className="cards__price">
              R$ {favorite.price.toFixed(2)}
            </div>
          </div>
        
      ))
    )
  }

  function returnNoWishlist(){
    return (
      <div className='noWishlist'>
        <p className='noWishlist__message'> 
          Sem itens em sua lista de desejos no momento! 😔
        </p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="container">
        <span>{"Home > Lista de desejos"}</span>
        <div className="cards">
          {wishlist?.length > 0
            ? returnWishlist(wishlist)
            : returnNoWishlist()}
        </div>
      </main>
    </>
  )
}

export default WishlistPage
