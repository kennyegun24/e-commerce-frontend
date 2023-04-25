import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus, FaMinus, FaCartPlus, FaShoppingCart } from 'react-icons/fa'
import './details.css'
import { itemAdded } from '../../redux/cart/cart'
import { v4 as uuid } from 'uuid'
import { useLocation } from 'react-router-dom'
import img from '../../assets/vic.jpg'
import Imag from './Image'
import useColor from '../cutomHook/useColor'

const Details = () => {
  const locate = useLocation()
  const { state } = locate
  const [quantity, setNumOfOrder] = useState(1)
  const dispatch = useDispatch()
  const increase = () => {
    setNumOfOrder(quantity + 1)
  }
  const decrease = () => {
    { quantity > 1 && setNumOfOrder(quantity - 1) }
  }
  const addItem = () => {
    dispatch(itemAdded({ id: uuid(), product: { state, price: state.price * quantity }, quantity, price: state.price * quantity }))
  }

  const [tabIndex, setTabIndex] = useState(1)

  const toggleTab = (ind) => {
    setTabIndex(ind)
  }

  const [color, setColor] = useState(null)

  // console.log(useColor)
  const num = parseInt(state.price)
  console.log(color)

  return (
    <section style={{ background: color }} className='detailsPage'>
      <div className='detailsPageLiilDiv'>
        <div className='detailsBigDivImg'>
          {/* <div className='detailsDvImg'> */}
          <Imag imageUrl={state.image} setColor={setColor} />
          {/* </div> */}

        </div>

        <div className='detailsDvDtl'>
          <aside className='prodDetailsAside1'>
            <div className='detailsProdName'>
              <h2>{state.name}</h2>
            </div>

            <div className='detailsCategory'>
              <strong><p>Category: {state.category.name}</p></strong>
              <span></span>
            </div>

            <div className='detailsStoreInStock'>
              <strong><p>Store: {state.store.store_name}</p></strong>
              <strong><p>Items left: {state.in_stock}</p></strong>
            </div>

            <div style={{ padding: '0 1.5rem' }}>
              <div className='tabs'>
                <div className='tabHeaders'>
                  <h3
                    style={{
                      background: tabIndex === 1 && color != '#fff' && color !== null ? color : '#d8d6d6',
                      color: tabIndex === 1 && color != '#fff' && color !== null ? '#fff' : '#3f3f3f'
                    }} onClick={() => toggleTab(1)} className={tabIndex === 1 ? 'active tabLilHeads' : 'tabLilHeads'}>
                    Description
                  </h3>
                  <h3
                    style={{
                      background: tabIndex === 2 && color != '#fff' && color !== null ? color : '#d8d6d6',
                      color: tabIndex === 2 && color != '#fff' && color !== null ? '#fff' : ' #111'
                    }} onClick={() => toggleTab(2)} className={tabIndex === 2 ? 'active tabLilHeads' : 'tabLilHeads'}>
                    Details
                  </h3>
                  <h3 style={{ background: tabIndex === 3 && color != '#fff' && color !== null && color, color: tabIndex === 3 && color != '#fff' && color !== null ? '#fff' : ' #111' }} className='tabLilHeads'>Reviews</h3>
                </div>

                <div className='detailsDesc'>
                  {/* <p className={tabIndex === 1 ? 'description-active' : 'non-active'}>{state.description}</p> */}
                  <span className={tabIndex === 1 ? 'description-active' : 'non-active'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti dolorum a omnis, amet necessitatibus. Officiis dolore nobis magnam! Explicabo rem ex consectetur ea blanditiis obcaecati, nihil illum nesciunt error?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti dolorum a omnis, amet necessitatibus. Officiis dolore nobis magnam! Explicabo rem ex consectetur ea blanditiis obcaecati, nihil illum nesciunt error?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti dolorum a omnis, amet necessitatibus. Officiis dolore nobis magnam! Explicabo rem ex consectetur ea blanditiis obcaecati, nihil illum nesciunt error?
                  </span>
                  <span className={tabIndex === 2 ? 'description-active' : 'non-active'}>
                    This is just a test details to populate the details field, cod the details from backend is not really full in any way atall, hence the reason why I am stressing myself to type this long text, and I aint gonna lie, this shit is extremely stressful and I kid you not! I just checked this shit and rrealized I have not even written much atallllll! Why is typing kinda hard sef? I could have swore I am typing really fast, but it seems i am just fooling my stupid self. Jusr checked again and i just added extra 4 lines, can you imagine??? 1 minutes for less than 100 words! That is fvckin slow, but programming is not just about the speed at which we type... At least that is what they all say
                    <p>Size: {state.size}</p>
                    <p>Color: {state.color}</p>
                  </span>
                  {/* <p className={tabIndex === 2 ? 'description-active' : 'non-active'}>{state.details}</p> */}
                </div>
              </div>
            </div>

            <div className='detailsCategory'>
              <span></span>
            </div>

            <div className='detailsPrice'>
              <div>
                <p style={{ fontSize: '25px' }}>${num.toLocaleString()}</p>
              </div>

              <div className='flex increment'>
                <button style={{ background: color }} className='addMinus' onClick={decrease} disabled={state.in_stock <= 1 && true}>
                  <FaMinus className='' >reduce</FaMinus>
                </button>
                <span>{quantity}</span>
                <button style={{ background: color }} className='addMinus' onClick={increase} disabled={state.in_stock <= 0 || quantity >= state.in_stock && true}>
                  <FaPlus className='' >add</FaPlus>
                </button>
              </div>
              <button style={{ background: color }} onClick={addItem} type="button" className='addCart' disabled={state.in_stock <= 1 || quantity > state.in_stock && true}><FaShoppingCart /></button>
            </div>

          </aside>

        </div>
      </div>
    </section>
  )
}

export default Details