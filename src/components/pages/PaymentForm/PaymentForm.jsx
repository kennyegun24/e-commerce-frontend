import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { Card, CardContent, StepLabel, Typography } from '@mui/material';
import AddressForm from './AddressForm';
import Payment from './Payment';
import { useLocation } from 'react-router-dom'
import Confirmation from './Confirmation';
import './payment.css'
import { FaCheck } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PaymentForm = () => {
    const steps = ['Shipping Address', 'Payment Details', 'Confirm', 'Success']
    const [activeStep, setActiveStep] = useState(0)
    const navigate = useNavigate()

    const location = useLocation()

    const onSuccess = () => {
        navigate('/')
    }

    const Success = () => {
        return (
            <div style={{ height: '50vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '2rem' }}>
                    <h3 style={{ textAlign: 'center' }}>Your order has been placed!</h3>
                    <FaCheck style={{ color: 'green', fontSize: '2rem' }} />
                </div>
                <Button color='success' type="submit" variant="contained" onClick={() => onSuccess()}>
                    Home Page
                </Button>

            </div>
        )
    }

    const Form = () => (
        (activeStep === 0 && <AddressForm setActiveStep={setActiveStep} />) || (activeStep === 1 && <Payment total={location.state.total} setActiveStep={setActiveStep} />) || (activeStep === 2 && <Confirmation setActiveStep={setActiveStep} orders={location.state.product} />)
    )
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alighItems: 'center', height: '95vh', backgroundColor: '#111144', fontFamily: 'sans-serif' }}>

            <Card className="card" sx={{ background: '#e3e3fc' }}>
                <CardContent style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>

                    <Typography variant='h5' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {(activeStep + 1) === steps.length ? <Success /> : <Form />}
                </CardContent>
            </Card>
        </div >
    )
}

export default PaymentForm