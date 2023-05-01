import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsAdded } from '../../../redux/order/order'

const Payment = ({ setActiveStep, total }) => {
    const [checkCardNumInp, setCheckCardNumInp] = useState('')
    const [checkExpMth, setCheckExpMth] = useState('')
    const [checkExpYear, setCheckExpYear] = useState('')
    const [checkCvv, setCheckCvv] = useState('')
    const dispatch = useDispatch()

    // const { addressDetails } = useSelector((state) => state.orders)
    // const { cardDetails } = useSelector((state) => state.orders)
    const { currentUser } = useSelector((state) => state.user)
    // console.log(addressDetails)
    // console.log(cardDetails)
    // console.log(currentUser)

    console.log(currentUser)
    const submit = () => {
        dispatch(detailsAdded({
            credit_card_cvv: checkCvv,
            credit_card_exp_month: parseInt(checkExpMth),
            credit_card_exp_year: checkExpYear,
            credit_card_number: checkCardNumInp,
            amount: total,
            user_id: currentUser.data.user.id,
        }))
        setActiveStep(2)
    }

    const valNumber = () => {
        if (checkCardNumInp.length <= 15 || checkCardNumInp.length > 16) {
            return true
        }
    }
    const valMnth = () => {
        if (checkExpMth.length < 2 || checkExpMth.length > 3) {
            return true
        }
    }
    const valYear = () => {
        if (checkExpYear.length <= 3 || checkExpYear.length > 4) {
            return true
        }
    }
    const valCvv = () => {
        if (checkCvv.length < 3 || checkCvv.length >= 4) {
            return true
        }
    }

    const checkValidate = () => {
        if (
            valCvv() || valYear() || valMnth() || valNumber()
        ) {

            return false
        } else {
            return true
        }
    }

    return (
        <>
            <Typography variant='p' align='center' gutterBottom>Payment Details</Typography>
            <div style={{ margin: 'auto', background: 'blue', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                <h6 align='center' style={{ color: '#fff', padding: '0.5rem', fontSize: '16px' }} >${total}</h6>
            </div>

            <Grid container spacing={2}>

                <Grid xs={12} sm={6} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} fullWidth error={valNumber()} color={valNumber() ? 'warning' : 'success'} required type='number' onChange={(e) => setCheckCardNumInp(e.target.value)} id="standard-basic" label="Card Number. 1234 5678 9012 3456" />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} error={valMnth()} fullWidth color={valMnth() ? 'warning' : 'success'} required type='text' onChange={(e) => setCheckExpMth(e.target.value)} id="standard-basic" label="Card exp month. 01/12" />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} error={valYear()} fullWidth color={valYear() ? 'warning' : 'success'} required type='number' onChange={(e) => setCheckExpYear(e.target.value)} id="standard-basic" label="Card exp year. 2024" />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} error={valCvv()} fullWidth color={valCvv() ? 'warning' : 'success'} required type='number' onChange={(e) => setCheckCvv(e.target.value)} id="standard-basic" label="CVV number... 123" />
                </Grid>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '1rem' }}>
                <div>
                    <Button color={checkValidate() ? 'success' : 'warning'} type="submit" variant="contained" onClick={(e) => { checkValidate() && submit() }}>Submit</Button>
                </div>

                <div>
                    <Button color='secondary' type="submit" variant="contained" onClick={(e) => { setActiveStep(0) }}>Back</Button>
                </div>
            </div>
        </>
    )
}
export default Payment