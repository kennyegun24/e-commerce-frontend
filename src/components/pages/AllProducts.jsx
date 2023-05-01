import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';
import { v4 as uuid } from 'uuid'
import { NavLink, Link } from 'react-router-dom';
import { searchInp } from "../../redux/search"
import { itemAdded } from '../../redux/cart/cart'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import LazyImage from './LazyImage';

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((prod) => prod.product)
  const { search, minVal, maxVal } = useSelector((state) => state.search)

  const [quantities, setQuantities] = useState([])


  useEffect(() => {
    if (products.length > 0) {
      setQuantities(products.map(() => 1));
    }
  }, [products]);
  const [quantity, setQuantity] = useState(1)

  const increase = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      setQuantity(quantities[index] + 1)
      newQuantities[index]++;
      return newQuantities;
    });
  }

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
    // { quantities > 1 && setQuantities(quantities - 1) }
  }

  const clear = () => {
    dispatch(searchInp(''))
  }

  return (
    <div>
      <h2 className='red bold prodStoreHead'>Products</h2>
      <div className='subProductsDiv'>
        <Row gutters={[32, 32]} className='rand'>
          {
            products.filter((e) => maxVal != '' ? (parseInt(e.price) >= minVal && parseInt(e.price) <= maxVal) : (parseInt(e.price) >= minVal && parseInt(e.price) <= 10000000)).filter((e) => e.name.toLowerCase().includes(search.toLowerCase())).map((prod, index) => {
              const state = prod
              const addItem = () => {
                dispatch(itemAdded({ id: uuid(), product: { ...state, price: prod.price * quantity }, quantity, price: prod.price * quantity }))
              }
              return (
                <Col xs={12} sm={12} lg={8} key={prod.id}>
                  <div className={`${prod.in_stock <= 0 && 'finish'} productsDivs`}>
                    <NavLink state={prod} onClick={() => clear()} to={`/product/${prod.id}`} className='productsDiv' >
                      <div className='prodLilImg'>
                        {/* <img className='prodImg' src={prod.image} alt="" /> */}
                        <LazyImage src={prod.image} />
                      </div>
                      <div className='prodLilDetails'>
                        <p className='bold'>{prod.category.name}</p>
                        <p className='bold'>{prod.name}</p>
                        <p className='bold red'>Price: ${prod.price}</p>
                        <p className='bold greySlash'>Previous: ${prod.price * 1.2}</p>
                        <p className="bold">{prod.store.store_name}</p>
                        <p className="bold">Stock {prod.in_stock}</p>
                      </div>
                    </NavLink>

                    <div className='addCartButton'>
                      <div className='cartAddRedButtons'>
                        <button onClick={() => decrease(index)} className='addMinus' disabled={prod.in_stock <= 0 ? true : false}>
                          <FaMinus className='' />
                        </button>
                        <span>{quantities[index]}</span>
                        <button onClick={() => increase(index)} className='addMinus' disabled={prod.in_stock <= 0 || prod.in_stock <= quantities[index] ? true : false}>
                          <FaPlus className='' />
                        </button>
                      </div>
                      <button disabled={prod.in_stock <= 0 ? true : false} onClick={addItem} type="button" className='addCart'>Add to cart</button>
                    </div>
                  </div>

                </Col>
              )
            })
          }
        </Row>
      </div>
    </div >
  )
}

export default AllProducts