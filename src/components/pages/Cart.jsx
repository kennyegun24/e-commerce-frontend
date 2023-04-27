import React, { useState } from 'react'
import { FaInfoCircle, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { deleteCart } from '../../redux/cart/cart'
import './cart.css'
import Success from './Success'

const Cart = () => {
  const product = useSelector(state => state.cart)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()
  const deleteCartItem = (id, price) => {
    dispatch(deleteCart({ id, price }))
    setSuccess(true)
  }
  return (
    <div className='cart'>
      <div className="cartDetailDiv">
        {product.products.length > 0 && <p style={{ height: '5vh', textAlign: 'center', fontSize: '2rem' }}>Cart</p>}
        {
          success && (setTimeout(() => { setSuccess(false) }, 4000)) && (
            <Success text={'Removed from cart'} color={'#111'} success={success} />
          )}
        {
          product.products.length < 1 ?
            (
              <div className='center'>
                <p style={{ opacity: '0.5', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>Cart is empty <FaInfoCircle /></p>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <p>Go back to</p><Link className='link' to='/'>homepage</Link>
                </div>
              </div>
            )
            :
            (
              <>
                <div className='cartDisplaySmDv'>
                  {product.products.map((cart) => {
                    return (
                      <div className='cartDisplay' key={cart.id} >

                        <NavLink state={cart.product} to={`/product/${cart.product.id}`} className='flexCart'>
                          <img src={cart.product.image} style={{ borderRadius: '12px', height: '75px', width: '75px' }} alt="" />
                          <div>
                            <h3 className='cartProdName'>
                              {cart.product.name}
                            </h3>
                            <p>
                              {cart.product.color}
                            </p>
                          </div>
                        </NavLink>

                        <div>
                          <p>
                            ${cart.price}
                          </p>
                          <p>
                            Qty: {cart.quantity}
                          </p>
                        </div>

                        <FaTrash onClick={() => deleteCartItem(cart.id, cart.product.price * cart.quantity)} />
                      </div>
                    )
                  })}
                </div>

                <div className='checkout'>
                  <h2 style={{ textAlign: 'center' }}>Payment Details</h2>
                  <div>
                    <div>
                      <p>Items:</p>
                      <p>${product.products.length > 0 ? Math.ceil(product.total) : 0}</p>
                    </div>

                    <div>
                      <p>Shipping(incl. taxes):</p>
                      <p>${product.products.length > 0 ? 20 : 0}</p>
                    </div>

                    <div>
                      <p>Total: </p>
                      <p>${Math.ceil(product.total) + (product.products.length > 0 ? 20 : 0)}</p>
                    </div>
                  </div>
                  <button className='checkoutBtn'>Checkout</button>
                </div>
              </>
            )}
      </div>
    </div>
  )
}

export default Cart