import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import './nav.css'
// import { loadCart } from '../../redux/cart/cart'
const Nav = () => {
  const { products } = useSelector(state => state.cart)
  // const { currentUser } = useSelector(state => state.user)

  // const dispatch = useDispatch()
  useEffect(() => {
    // currentUser ? dispatch(loadCart({ currentUser: currentUser.data.token })) : dispatch(loadCart({ currentUser: null }))
  }, [])
  return (
    <>
      <header className='navHeader'>
        <nav className='navHead'>
          <nav>
            <h5>E-shopping</h5>

            <h6>spree</h6>
          </nav>

          <nav>
            <h6>spree</h6>

            <h6>#NGN</h6>
          </nav>
        </nav>

        <nav className='mainHead'>
          <h1>
            Shopping Spree
          </h1>

          <input type='search' className='search' />

          <Link to='/cart' className='navCart'>
            <FaShoppingCart className='cartIcon' />
            {products.length > 0 && <p>{products.length}</p>}
          </Link>
        </nav>

        <nav className='navOptions'>
          <ul>
            <NavLink to='/' className='navLink'>Home</NavLink>
            <NavLink className='navLink' to='/categories'>Categories</NavLink>
            <NavLink to='/stores' className='navLink'>Stores</NavLink>
            <li>About us</li>
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>Fashion</li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Nav