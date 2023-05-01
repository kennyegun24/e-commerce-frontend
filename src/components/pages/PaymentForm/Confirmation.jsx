import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { completeOrder } from '../../../redux/order/order'

const Confirmation = ({ orders, setActiveStep }) => {
    const { cardDetails } = useSelector((state) => state.orders)
    const { addressDetails } = useSelector((state) => state.orders)
    const { currentUser } = useSelector((state) => state.user)
    const [spinner, setSpinner] = useState(false)
    const [failure, setFailure] = useState(null)
    const [success, setSuccess] = useState(null)

    const sendOrder = async () => {
        const items = orders.map((order) => ({
            store_id: order.product.store_id,
            product_id: order.product.id,
            product_name: order.product.name,
            image: order.product.image,
            amount: order.product.price,
            quantity: order.quantity,
        }))
        try {
            setSpinner(true)
            await completeOrder({
                TOKEN: currentUser.data.token, order: {
                    items,
                    ...cardDetails,
                    ...addressDetails
                }
            })
            setSuccess('Payment Successful')
            setSpinner(false)
            setActiveStep(3)
        } catch (error) {
            setSpinner(false)
            setSuccess('Payment Successful')
            setFailure(error.message)
        }
    }
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        let q = 0;
        orders.map((order) => setQuantity(q += order.quantity))
    }, [orders])

    return (
        <>
            <header style={{ textAlign: 'center', marginTop: '1rem' }}>
                <h3>Confirm your orders and Payment</h3>
            </header>

            <div>
                <p style={{ fontWeight: 600 }}>
                    You have made a purchase of {orders.length} different products and {quantity} quantities in number which amounts to ${cardDetails.amount}
                </p>
            </div>
            <Button sx={{ width: 'fit-content', margin: 'auto' }} color={'success'} type="submit" variant="contained" onClick={() => { sendOrder() }}>Pay Now</Button>
            {spinner && <span className='spinner'></span>}
            {
                failure && setTimeout(() => { setFailure(null) }, 10000) && (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ color: 'red', fontWeight: '700' }}>{failure}</span>
                            <span style={{ fontSize: '25px' }}>😪</span>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>No need to panic,just refresh your browser and retry again or check if your details are crrect</span>
                    </>
                )
            }

            {
                success && setTimeout(() => { setSuccess(null) }, 10000) && <p style={{ color: 'green', fontWeight: '700', textAlign: 'center' }}>{success} 😁🚀</p>
            }
        </>
    )
}

export default Confirmation