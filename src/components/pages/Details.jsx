import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import './details.css'
import { itemAdded } from '../../redux/cart/cart'
import { v4 as uuid } from 'uuid'
import { useNavigate, useLocation } from 'react-router-dom'
import Imag from './Image'
import { getOneProduct } from '../../redux/product/product'

const Details = () => {
  const { product, status } = useSelector(state => state.product)
  const locate = useLocation()
  const [quantity, setNumOfOrder] = useState(1)
  const dispatch = useDispatch()

  const [success, setSuccess] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [length, setLength] = useState(1)
  const history = useNavigate()

  const increase = () => {
    setNumOfOrder(quantity + 1)
  }

  const decrease = () => {
    { quantity > 1 && setNumOfOrder(quantity - 1) }
  }

  const addItem = () => {
    dispatch(itemAdded({ id: uuid(), product: { ...product, price: product.price * quantity }, quantity, price: product.price * quantity }))
    setSuccess(true)

    let i = 1
    let j = 1
    const loop = setInterval(() => {
      i -= 0.1
      setOpacity(i)
      if (i <= 0.1) {
        clearInterval(loop)
      }
    }, 400);
    const secLoop = setInterval(() => {
      j -= 0.02
      setLength(j)
      if (i <= 0.1) {
        clearInterval(secLoop)
      }
    }, 80);
  }

  const [tabIndex, setTabIndex] = useState(1)

  const toggleTab = (ind) => {
    setTabIndex(ind)
  }

  const [color, setColor] = useState(null)

  const num = parseInt(product.price)
  const nav = locate.pathname
  const split = nav.split('/')
  const separate = split.slice(0, -1)
  const joinUrl = separate.join('/')
  const getId = split[split.length - 1]

  useEffect(() => {
    dispatch(getOneProduct(getId))
  }, [])

  return (
    <section style={{ background: color }} className='detailsPage'>
      {
        success && (setTimeout(() => { setSuccess(false) }, 4000)) && (
          <div className='successMessage'>
            <span style={{ opacity: opacity }} className='success'>Added to cart</span>
            <span style={{ background: '#fff', width: `${length * 100}%`, opacity: opacity, height: '5px' }}></span>
          </div>
        )
      }
      {status ? <p>hey</p> : (
        <div className='detailsPageLiilDiv'>
          <AiOutlineArrowLeft onClick={() => history(joinUrl == '/product' ? '/' : joinUrl)} />
          <div className='detailsBigDivImg'>
            <Imag imageUrl={product.image} setColor={setColor} />
          </div>

          <div className='detailsDvDtl'>
            <aside className='prodDetailsAside1'>
              <div className='detailsProdName'>
                <h2>{product.name}</h2>
              </div>

              <div className='detailsCategory'>
                <strong><p>Category: {product.category && product.category.name}</p></strong>
                <span></span>
              </div>

              <div className='detailsStoreInStock'>
                <strong><p>Store: {product.store && product.store.store_name}</p></strong>
                <strong><p>Items left: {product.in_stock}</p></strong>
              </div>

              <div className='tabsContainer'>
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
                    <span className={tabIndex === 1 ? 'description-active' : 'non-active'}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti dolorum a omnis, amet necessitatibus. Officiis dolore nobis magnam! Explicabo rem ex consectetur ea blanditiis obcaecati, nihil illum nesciunt error?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti dolorum a omnis, amet necessitatibus. Officiis dolore nobis magnam! Explicabo rem ex consectetur ea blanditiis obcaecati, nihil illum nesciunt error?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti dolorum a omnis, amet necessitatibus. Officiis dolore nobis magnam! Explicabo rem ex consectetur ea blanditiis obcaecati, nihil illum nesciunt error?
                    </span>
                    <span className={tabIndex === 2 ? 'description-active' : 'non-active'}>
                      This is just a test details to populate the details field, cod the details from backend is not really full in any way atall, hence the reason why I am stressing myself to type this long text, and I aint gonna lie, this shit is extremely stressful and I kid you not! I just checked this shit and rrealized I have not even written much atallllll! Why is typing kinda hard sef? I could have swore I am typing really fast, but it seems i am just fooling my stupid self. Jusr checked again and i just added extra 4 lines, can you imagine??? 1 minutes for less than 100 words! That is fvckin slow, but programming is not just about the speed at which we type... At least that is what they all say
                      <p>Size: {product.size}</p>
                      <p>Color: {product.color}</p>
                    </span>
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
                  <button style={{ background: color }} className='addMinus' onClick={decrease} disabled={product.in_stock <= 1 && true}>
                    <FaMinus className='' >reduce</FaMinus>
                  </button>
                  <span>{quantity}</span>
                  <button style={{ background: color }} className='addMinus' onClick={increase} disabled={product.in_stock <= 0 || quantity >= product.in_stock && true}>
                    <FaPlus className='' >add</FaPlus>
                  </button>
                </div>
                <button style={{ background: color }} onClick={addItem} type="button" className='addCart' disabled={product.in_stock <= 1 || quantity > product.in_stock && true}><FaShoppingCart /></button>
              </div>

            </aside>

          </div>
        </div>
      )}
    </section>
  )
}

export default Details