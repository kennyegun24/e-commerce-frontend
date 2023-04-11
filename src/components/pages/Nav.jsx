import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import './nav.css'
import { loginSuccess } from '../../redux/user/user'
import useSearch from '../cutomHook/useSearch'
const Nav = () => {
  const { products } = useSelector(state => state.cart)
  const { currentUser } = useSelector(state => state.user)

  const { checkInput, handleSearch, getMax, getMin } = useSearch()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(loginSuccess(null))
  }

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
            <Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>
              Shopping Spree
            </Link>
          </h1>

          <form >
            <input type='search' className='search' placeholder='Search for items based on name' onChange={checkInput} /> <button type='submit' onClick={handleSearch}><FaSearch /></button>
            <input type="number" onChange={getMin} placeholder='Min Price' />
            <input type="number" onChange={getMax} placeholder='Max Price' />
          </form>

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
            <NavLink style={{ color: 'black', textDecoration: 'none' }} onClick={() => currentUser && logout()} to={!currentUser && '/login'}>{currentUser ? 'Logout' : 'Login'}</NavLink>
            <li>Fashion</li>
          </ul>
        </nav>
      </header >
    </>
  )
}

export default Nav