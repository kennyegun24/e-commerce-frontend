import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
const ThreeCategories = () => {
    SwiperCore.use([Autoplay]);
    const { category } = useSelector((prod) => prod.category)

    return (
        <div>
            {/* <div className='home'> */}
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {
                    category.map((cate) => {
                        return (
                            <SwiperSlide>
                                <NavLink key={cate.id} state={cate.product} to={`/categories/${cate.id}/products`} className='homeCatDv'>
                                    <img className='catImg' src={cate.image} alt="" />
                                    <p className='catName'>{cate.name}</p>
                                </NavLink>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {/* </div> */}
            <div>

                <Link className='catViewAll' to='/categories'>View all categories...</Link>
            </div>
        </div>
    )
}

export default ThreeCategories