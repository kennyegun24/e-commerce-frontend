import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus, FaMinus } from 'react-icons/fa'
import './details.css'
import { itemAdded } from '../../redux/cart/cart'
import { v4 as uuid } from 'uuid'
import { getProduct } from '../../redux/product/product'
import { useLocation } from 'react-router-dom'

const Details = () => {
  const locate = useLocation()
  const { state } = locate

  useEffect(() => {
    // dispatch(getProduct(toJson.id))
  }, [])
  // const { currentUser } = useSelector(state => state.user)
  const [quantity, setNumOfOrder] = useState(1)
  const dispatch = useDispatch()
  const increase = () => {
    setNumOfOrder(quantity + 1)
  }
  const decrease = () => {
    { quantity > 1 && setNumOfOrder(quantity - 1) }
  }
  const addItem = () => {
    // dispatch(itemAdded({ currentUser: currentUser.data.token, id: uuid(), product, quantity, price: state.price * quantity }))
    dispatch(itemAdded({ id: uuid(), product: state, quantity, price: state.price * quantity }))
  }

  return (
    <section className='detailsPage'>
      <div className='detailsDvImg'>
        <img src={state.image} alt="" />
      </div>

      <div className='detailsDvDtl'>
        <div>
          <h2>{state.name}</h2>
        </div>

        <div className='detailsSize'>
          <p>Select the size you want</p>
          <span>{state.size}</span>
        </div>
        <div className='detailsDesc'>
          <p>Product Description:</p>
          <span>{state.description}</span>
        </div>
        <div className='detailsCategory'>
          <p>Category: {state.category.name}</p>
          <span></span>
        </div>
        <div className='detailsCategory'>
          <p>Color: {state.color}</p>
          <span></span>
        </div>
        <div className='detailsCategory'>
          <p>Store: {state.store.store_name}</p>
          <span></span>
        </div>
        <div className='detailsPrice'>
          <div>
            <p>Price:</p>
            <h2>${state.price}</h2>
          </div>

          <div className='redSlash'>
            <p>Old price:</p>
            <h2>${state.price * 1.2}</h2>
          </div>
        </div>
        <div className='flex increment'>
          <button className='addMinus'>
            <FaMinus className='' onClick={decrease}>reduce</FaMinus>
          </button>
          <span>{quantity}</span>
          <button className='addMinus'>
            <FaPlus className='' onClick={increase}>add</FaPlus>
          </button>
        </div>
        <button onClick={addItem} type="button" className='addCart'>Add to cart</button>
      </div>
    </section>
  )
}

export default Details