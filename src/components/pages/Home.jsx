import React, { useEffect, useState } from 'react';
import './home.css';
import { Row, Col } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../../redux/store/store';
import { getAllProducts } from '../../redux/product/product';
import { getCategory } from '../../redux/category/category';
import { FaHourglass, FaPlus, FaMinus } from 'react-icons/fa'
import { itemAdded } from '../../redux/cart/cart'
import { v4 as uuid } from 'uuid'
const Home = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.store)
  const { products } = useSelector((prod) => prod.product)
  const { category } = useSelector((prod) => prod.category)

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getStores())
    dispatch(getAllProducts())
  }, [])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  let currentItems = products.slice(firstIndex, lastIndex)
  const [quantities, setQuantities] = useState([])
  useEffect(() => {
    if (products.length > 0) {
      setQuantities(products.map(() => 1));
    }
  }, [products]);
  const [quantity, setQuantity] = useState(0)
  const increase = (index) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      setQuantity(quantities[index] + 1)
      newQuantities[index]++;
      console.log(quantities[index] + 1)
      return newQuantities;
    });
  }
  const decrease = (index) => {
    if (quantities[index] > 1) {
      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        setQuantity(quantities[index] - 1)
        newQuantities[index]--;
        console.log(quantities[index] - 1)
        return newQuantities;
      });
      return false
    }
    // { quantities > 1 && setQuantities(quantities - 1) }
  }
  return (
    <div className='homeMainDiv'>
      {products.length < 1 ?
        <p className="center"><FaHourglass className='rotate' />Loading...</p>
        :
        (<>
          <div className='homeLilDv'>
            <h2 className="red bold fntLg">Categories</h2>
            <div className='home'>
              {
                category.map((cate) => {
                  return (
                    <NavLink key={cate.id} state={cate.product} to={`/categories/${cate.id}/products`} className='homeCatDv'>
                      <img className='catImg' src={cate.image} alt="" />
                      <p className='redBg'></p>
                      <p className='catName'>{cate.name}</p>
                    </NavLink>
                  )
                })
              }
            </div>
            <div>

              <Link className='catViewAll' to='/categories'>View all categories...</Link>
            </div>
          </div>

          <div className='mainProductsDiv'>
            <h2 className='red bold fntLg'>Products</h2>
            <div className='subProductsDiv'>
              <Row gutters={[32, 32]} className='rand'>
                {
                  currentItems.map((prod, index) => {
                    const state = prod

                    const addItem = () => {
                      dispatch(itemAdded({ id: uuid(), product: { state, price: prod.price * quantity }, quantity, price: prod.price * quantity }))
                    }
                    return (
                      <Col xs={24} sm={12} lg={6} key={prod.id}>
                        <div className='productsDivs'>
                          <NavLink state={prod} to={`/product/${prod.id}`} className='productsDiv' >
                            <div className='prodLilImg'>
                              <img className='prodImg' src={prod.image} alt="" />
                            </div>
                            <div className='prodLilDetails'>
                              <p className='bold'>{prod.category.name}</p>
                              <p className='bold'>{prod.name}</p>
                              <p className='bold red'>Price: ${prod.price}</p>
                              <p className='bold greySlash'>Previous: ${prod.price * 1.2}</p>
                              <p className="bold">{prod.store.store_name}</p>
                            </div>
                          </NavLink>

                          <div className='addCartButton'>
                            <div className='cartAddRedButtons'>
                              <button className='addMinus'>
                                <FaMinus className='' onClick={() => decrease(index)} />
                              </button>
                              <span>{quantities[index]}</span>
                              <button className='addMinus'>
                                <FaPlus className='' onClick={() => increase(index)} />
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
            <div className='nextPrev'>
              {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>...Previous</button>
              )}
              {currentPage < Math.ceil(products.length / itemsPerPage) && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              )}
            </div>
          </div>

          <div className='homeLilDv'>
            <h2 className="red bold fntLg">Stores</h2>
            <div className='home'>
              {
                store.stores.map((sto) => {
                  return (
                    <NavLink key={sto.id} state={sto.product} to={`/store/${sto.id}/products`} className='homeCatDv'>
                      <img className='catImg' src={sto.image} alt="" />
                      <p className='redBg'></p>
                      <p className='catName'>{sto.store_name}</p>
                    </NavLink>
                  )
                })
              }
            </div>
          </div>
        </>)
      }
    </div >
  );
};

export default Home;