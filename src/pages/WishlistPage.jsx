import React from 'react'
import Header from '../components/Header'
import { useRequestLocalStorage } from '../services'
import { AiFillHeart } from 'react-icons/ai'

const WishlistPage = () => {
  const { data: favorites } = useRequestLocalStorage('wishlist')

  function returnWishlist(favorites){
    favorites?.map(favorite => {
      return (
        <div className="cards__item" key={favorite.id}>
          <div className="cards__fav"><AiFillHeart /></div>
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
      )
    })
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
      <main className='container'>
        <span>{'Home > Lista de desejos'}</span>
        <div className="cards">
          {favorites?returnWishlist():returnNoWishlist()}
        </div>
      </main>
    </>
  )
}

export default WishlistPage
