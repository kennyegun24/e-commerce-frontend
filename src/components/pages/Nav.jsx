import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import './nav.css'
import { loginSuccess } from '../../redux/user/user'
import useSearch from '../cutomHook/useSearch'
import { AiOutlineClose } from 'react-icons/ai'
const Nav = () => {
  const { products } = useSelector(state => state.cart)
  const { currentUser } = useSelector(state => state.user)

  const { checkInput, getMax, getMin } = useSearch()
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const logout = () => {
    dispatch(loginSuccess(null))
    setToggle(false)
  }

  const [toggle, setToggle] = useState(false)

  return (
    <>
      {!toggle && <div onClick={() => setToggle(true)} className='toggle'><FaBars style={{ fontSize: '1.5rem', fontWeight: 'bold', }} /></div>}
      {toggle && <div onClick={() => setToggle(false)} className='toggle'><AiOutlineClose style={{ fontSize: '1.5rem', fontWeight: 'bold', }} /></div>}
      <header className={`${toggle ? 'navHeader' : 'navHeader hideNav'}`}>
        <nav className='navHead'>
          <nav>
            <h5>E-shopping</h5>
          </nav>

          <nav>

            <h6>#NGN</h6>
          </nav>
        </nav>

        <nav className='mainHead'>
          <div>
            <h1 className='navH1'>
              <Link to='/' style={{ textDecoration: 'none', color: '#fff' }}>
                Shopping Spree
              </Link>
            </h1>

            <Link to='/cart' onClick={() => setToggle(false)} className='navCart'>
              <FaShoppingCart className='cartIcon' />
              {products.length > 0 && <p>{products.length}</p>}
            </Link>
          </div>

          <form className='searchForm'>
            <input type='search' className='search' placeholder='Search for items based on name' onChange={checkInput} />
            <div>
              <p>Filters:</p>
              <input type="number" onChange={getMin} placeholder='Min Price' />
              <input type="number" onChange={getMax} placeholder='Max Price' />
            </div>
          </form>
        </nav>

        <nav className='navOptions'>
          <ul>
            <NavLink onClick={() => setToggle(false)} to='/' className='navLink'>Home</NavLink>
            <NavLink onClick={() => setToggle(false)} className='navLink' to='/categories'>Categories</NavLink>
            <NavLink onClick={() => setToggle(false)} to='/stores' className='navLink'>Stores</NavLink>
            <li onClick={() => setToggle(false)} className='navLink'>About us</li>
            <NavLink className='navLogout' onClick={() => currentUser && logout()} to={!currentUser && '/login'}>{currentUser ? 'Logout' : 'Login'}</NavLink>
            <li onClick={() => setToggle(false)} className='navLink'>Fashion</li>
          </ul>
        </nav>
      </header >
    </>
  )
}

export default Nav