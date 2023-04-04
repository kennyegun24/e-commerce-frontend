import React, { useEffect, useState } from 'react';
import './home.css';
import { Row, Col } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../../redux/store/store';
import { getAllProducts } from '../../redux/product/product';
import { getCategory } from '../../redux/category/category';
const Home = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.store)
  const { products } = useSelector((prod) => prod.product)
  const { category } = useSelector((prod) => prod.category)

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getStores())
    dispatch(getAllProducts())
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  let currentItems = products.slice(firstIndex, lastIndex)

  return (
    <div className='homeMainDiv'>
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
              currentItems.map((prod) => {
                return (
                  <Col xs={24} sm={12} lg={6} key={prod.id}>
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
          {currentPage < Math.ceil(currentItems.length / itemsPerPage) && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>

      <div className='homeLilDv'>
        <h2 className="red bold fntLg">Stores</h2>
        <div className='home'>
          {
            store.stores.map((sto) => (
              <div key={sto.id} className='homeCatDv'>
                <img className='catImg' src={sto.store_name} alt="" />
                <p className='redBg'></p>
                <p className='catName'>{sto.store_name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  );
};

export default Home;