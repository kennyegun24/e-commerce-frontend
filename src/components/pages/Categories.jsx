import React, { useEffect } from 'react'
import { getAllCategories } from '../../redux/category/category'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'

const Categories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((cate) => cate.category)
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  console.log(categories.map(hey => hey.product.map(hey => hey)))
  return (
    <div>
      <div className='mainProductsDiv'>
        <h2 className='red bold fntLg'>Categories</h2>
        <div className='subProductsDiv'>
          <Row gutters={[32, 32]} className='rand'>
            {
              categories.map((prod) => {
                const states = prod.product.map((hey) => hey)

                return (
                  <Col xs={24} sm={12} lg={12} key={prod.id}>
                    <NavLink state={states} to={`/categories/${prod.id}/products`} className='productsDiv' >
                      <div className='prodLilImg'>
                        <img className='prodImg' src={prod.image} alt="" />
                      </div>
                      <div className='prodLilDetails'>
                        <p className='bold'>{prod.name}</p>
                      </div>
                    </NavLink>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Categories