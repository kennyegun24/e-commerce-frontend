import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import { getStores } from '../../redux/store/store';
const ThreeStores = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStores())
    }, [])

    SwiperCore.use([Autoplay]);
    const store = useSelector(state => state.store)

    return (
        <div>
            {/* <div className='home'> */}
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
            >
                {
                    store.stores.map((sto) => {
                        return (
                            <SwiperSlide>
                                <NavLink key={sto.id} to={`/store/${sto.id}/products`} className='homeCatDv'>
                                    <img className='catImg' src={sto.image} alt="" />
                                    <p className='catName'>{sto.store_name}</p>
                                </NavLink>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper >
        </div>
        // </div>
    )
}

export default ThreeStores