import React, { useEffect } from 'react'
import { getAllCategories } from '../../redux/category/category'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Categories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((cate) => cate.category)
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])
  const history = useNavigate()

  return (
    <div>
      {categories.length < 1 ?
        <div className="center"><p className='rotate' /></div>
        :
        (<div className='mainProductsDiv'>
          <AiOutlineArrowLeft style={{ background: '#111', color: '#fff' }} className='arrowBack' onClick={() => history('/')} />
          <h2 className='prodStoreHead'>Categories</h2>
          <div className='subProductsDiv'>
            <Row gutters={[32, 32]} className='rand'>
              {
                categories.map((prod) => {

                  return (
                    <Col xs={12} sm={12} lg={12} key={prod.id}>
                      <NavLink to={`/categories/${prod.id}/products`} className='productsDiv' >
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
        </div>)
      }
    </div>
  )
}

export default Categories