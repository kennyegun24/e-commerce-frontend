import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const ThreeStores = () => {
    const store = useSelector(state => state.store)

    return (
        <div>
            <h2 className="red bold fntLg">Stores</h2>
            <div className='home'>
                {
                    store.stores.map((sto) => {
                        return (
                            <NavLink key={sto.id} state={sto.product} to={`/store/${sto.id}/products`} className='homeCatDv'>
                                <img className='catImg' src={sto.image} alt="" />
                                <p className='redBg'></p>
                                <p className='catName'>{sto.store_name}</p>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ThreeStores