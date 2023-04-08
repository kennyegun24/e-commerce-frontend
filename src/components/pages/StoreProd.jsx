import React from 'react'
import { Col, Row } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { FaHourglass } from 'react-icons/fa'

const StoreProd = () => {
  const location = useLocation()
  const { state } = location
  const { pathname } = location
  return (
    <div>
      {state.length > 0 && <h2 className='fntLg'>{state[0].store.store_name}</h2>}
      {state.length > 0 ?
        (<Row gutters={[32, 32]} className='rand'>
          {
            state.map((prod) => (
              <Col xs={24} sm={12} lg={6} key={prod.id}>
                <NavLink state={prod} to={`${pathname}/${prod.id}`} className='productsDiv' >
                  <div className='prodLilImg'>
                    <img className='prodImg' src={prod.image} alt="" />
                  </div>
                  <div className='prodLilDetails'>
                    <p className='bold'>{prod.category.name}</p>
                    <p className='bold'>{prod.name}</p>
                    <p className='bold red'>Price: ${prod.price}</p>
                    <p className='bold greySlash'>Previous: ${prod.price * 1.2}</p>
                    {/* <p className="bold">{prod.store.store_name}</p> */}
                  </div>
                </NavLink>
              </Col>
            ))
          }
        </Row>) : <p className="center"><FaHourglass />No product in this store</p>}
    </div>

  )
}

export default StoreProd