import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { itemAdded } from '../../redux/cart/cart'
import { v4 as uuid } from 'uuid'
import { getOneCategory } from '../../redux/category/category'
import { getOneStore } from '../../redux/store/store'

const StoreProd = () => {
  const { oneCategory, status } = useSelector(state => state.category)
  const getJustOneStore = useSelector(state => state.store)
  const oneStore = getJustOneStore.oneStore
  const pending = getJustOneStore.status
  const location = useLocation()
  const { pathname } = location
  const [quantities, setQuantities] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    if (oneCategory.length > 0) {
      setQuantities(oneCategory.map(() => 1));
    }
  }, [oneCategory]);

  const nav = location.pathname
  const split = nav.split('/')
  const separate = split.slice(0, -2)
  const joinUrl = separate.join('/')
  const getId = split[split.length - 2]

  useEffect(() => {
    joinUrl === '/categories' && dispatch(getOneCategory(getId))
    joinUrl === '/store' && dispatch(getOneStore(getId))
  }, [])

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
      {joinUrl === '/categories' && status || joinUrl === '/store' && pending ? <div className=''>pending</div> :
        (
          <div>
            {oneCategory.length > 0 && joinUrl === `/categories` && <h2 className='prodStoreHead'>{oneCategory[0].category.name}</h2>}
            {oneStore.length > 0 && joinUrl === `/store` && <h2 className='prodStoreHead'>{oneStore[0].store.store_name}</h2>}
            <Row gutters={[32, 32]} className='rand'>
              {
                joinUrl === '/categories' ? oneCategory.map((prod, index) => {
                  const state = prod
                  const addItem = () => {
                    dispatch(itemAdded({ id: uuid(), product: { state, price: prod.price * quantity }, quantity, price: prod.price * quantity }))
                  }
                  return (
                    <Col xs={12} sm={12} lg={6} key={prod.id}>
                      <div className='productsDivs'>
                        <NavLink to={`${pathname}/${prod.id}`} className='productsDiv' >
                          <div className='prodLilImg'>
                            <img className='prodImg' src={prod.image} alt="" />
                          </div>
                          <div className='prodLilDetails'>
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
                }) : oneStore.map((prod, index) => {
                  const state = prod
                  const addItem = () => {
                    dispatch(itemAdded({ id: uuid(), product: { state, price: prod.price * quantity }, quantity, price: prod.price * quantity }))
                  }
                  return (
                    <Col xs={12} sm={12} lg={6} key={prod.id}>
                      <div className='productsDivs'>
                        <NavLink state={prod} to={`${pathname}/${prod.id}`} className='productsDiv' >
                          <div className='prodLilImg'>
                            <img className='prodImg' src={prod.image} alt="" />
                          </div>
                          <div className='prodLilDetails'>
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
            </Row>
          </div>
        )}
    </div>

  )
}

export default StoreProd