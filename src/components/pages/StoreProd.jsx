import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { FaHourglass, FaPlus, FaMinus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { itemAdded } from '../../redux/cart/cart'
import { v4 as uuid } from 'uuid'

const StoreProd = () => {
  const location = useLocation()
  const { state } = location
  const { pathname } = location
  const [quantities, setQuantities] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    if (state.length > 0) {
      setQuantities(state.map(() => 1));
    }
  }, [state]);

  // Increase counter
  const increase = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      setQuantity(quantities[index] + 1)
      newQuantities[index]++;
      return newQuantities;
    });
  }

  // Decrease counter
  const decrease = (index) => {
    if (quantities[index] > 1) {
      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        setQuantity(quantities[index] - 1)
        newQuantities[index]--;
        return newQuantities;
      });
      return false
    }
  }

  return (
    <div>
      {state.length > 0 && pathname === `/categories/${state[0].category_id}/products` ? <h2>{state[0].category.name}</h2> : <h2 className='fntLg'>{state[0].store.store_name}</h2>}
      {state.length > 0 ?
        (<Row gutters={[32, 32]} className='rand'>
          {
            state.map((prod, index) => {
              const state = prod
              const addItem = () => {
                dispatch(itemAdded({ id: uuid(), product: { state, price: prod.price * quantity }, quantity, price: prod.price * quantity }))
              }
              return (
                <Col xs={24} sm={12} lg={6} key={prod.id}>
                  <div className='productsDivs'>
                    <NavLink state={prod} to={`${pathname}/${prod.id}`} className='productsDiv' >
                      <div className='prodLilImg'>
                        <img className='prodImg' src={prod.image} alt="" />
                      </div>
                      <div className='prodLilDetails'>
                        <p className='bold'>{prod.category.name}</p>
                        <p className='bold'>{prod.name}</p>
                        <p className='bold red'>Price: ${prod.price}</p>
                        <p className='bold greySlash'>Previous: ${prod.price * 1.2}</p>
                        <p className='bold'>Stock: {prod.in_stock}</p>
                      </div>
                    </NavLink>

                    <div className='addCartButton'>
                      <div className='cartAddRedButtons'>
                        <button onClick={() => decrease(index)} className='addMinus'>
                          <FaMinus className='' />
                        </button>
                        <span>{quantities[index]}</span>
                        <button onClick={() => increase(index)} className='addMinus'>
                          <FaPlus className='' />
                        </button>
                      </div>
                      <button onClick={addItem} type="button" className='addCart'>Add to cart</button>
                    </div>

                  </div>
                </Col>
              )
            })
          }
        </Row>) : <p className="center"><FaHourglass />No product in this store</p>}
    </div>

  )
}

export default StoreProd