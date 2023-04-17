import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

const ThreeCategories = () => {
    const { category } = useSelector((prod) => prod.category)

    return (
        <div>
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
    )
}

export default ThreeCategories