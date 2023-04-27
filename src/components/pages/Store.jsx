import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStores } from '../../redux/store/store'

const Store = () => {
  const dispatch = useDispatch()
  const { allStores } = useSelector((state) => state.store)
  useEffect(() => {
    dispatch(getAllStores())
  }, [])
  return (
    <>
      {allStores.length < 1 ?
        <div className="center"><p className='rotate' /></div>
        :
        (
          <div className='mainProductsDiv'>
            <h2 className='prodStoreHead'>Stores</h2>
            <div className='subProductsDiv'>
              <Row gutters={[32, 32]} className='rand'>
                {allStores.map((store) => {
                  const states = store.product.map((individualStoreProduct) => individualStoreProduct)

                  return (
                    <Col xs={12} sm={12} lg={12} key={store.id}>
                      <NavLink state={states} to={`/store/${store.id}/products`} className='productsDiv' >
                        <div className='prodLilImg'>
                          <img className='prodImg' src={store.image} alt="" />
                        </div>
                        <div className='prodLilDetails'>
                          <p className='bold'>{store.store_name}</p>
                        </div>
                      </NavLink>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
        )}
    </>
  )
}

export default Store