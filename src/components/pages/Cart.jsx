import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteCart, itemAdded, loadCart } from '../../redux/cart/cart'
import './cart.css'

const Cart = () => {
  const product = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const deleteCartItem = (id, price) => {
    dispatch(deleteCart({ id, price }))
  }
  return (
    <div className='cart'>
      <div className="cartDetailDiv">
        <div className='cartDisplaySmDv'>
          {product.products.map((cart) => {
            return (
              <div className='cartDisplay' key={cart.id} >
                <NavLink state={cart.product.state} to={`/product/${cart.product.state.id}`} className='flexCart'>
                  <img src={cart.product.state.image} style={{ borderRadius: '12px', height: '75px', width: '75px' }} alt="" />
                  <div>
                    <h3>
                      {cart.product.state.name}
                    </h3>
                    <p>
                      {cart.product.state.name}
                    </p>
                  </div>
                </NavLink>

                <div>
                  <p>
                    {cart.quantity}
                  </p>
                  <p>
                    {cart.product.state.color}
                  </p>
                </div>

                <div>
                  <p>
                    ${cart.price}
                  </p>
                </div>

                <FaTrash onClick={() => deleteCartItem(cart.id, cart.product.state.price * cart.quantity)} />
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
      </div>
    </div>
  )
}

export default Cart