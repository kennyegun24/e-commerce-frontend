import React, { useEffect, useState, lazy, Suspense } from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../../redux/store/store';
import { getAllProducts } from '../../redux/product/product';
import { getCategory } from '../../redux/category/category';
import { FaHourglass, FaPlus, FaMinus } from 'react-icons/fa'
import ThreeCategories from './ThreeCategories';
import AllProducts from './AllProducts';

const ThreeStores = lazy(() => import('./ThreeStores'));

const Home = () => {
  const dispatch = useDispatch()
  const { products } = useSelector((prod) => prod.product)

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getAllProducts())
  }, [])

  return (
    <div className='homeMainDiv'>
      {products.length < 1 ?
        <p className="center"><FaHourglass className='rotate' />Loading...</p>
        :
        (<>
          <div className='homeLilDv'>
            <ThreeCategories />
          </div>

          <div className='mainProductsDiv'>
            <AllProducts />
          </div>

          <div className='homeLilDv'>
            <Suspense fallback="laod...">
              <ThreeStores />
            </Suspense>
          </div>
        </>)
      }
    </div >
  );
};

export default Home;