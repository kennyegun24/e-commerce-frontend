import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addressAdded } from '../../../redux/order/order'
import { useDispatch } from 'react-redux'

const AddressForm = ({ setActiveStep }) => {

    const [checkName, setCheckName] = useState('')
    const [checkAddress, setCheckAddress] = useState('')
    const [checkTelNumber, setCheckTelNumber] = useState('')
    const dispatch = useDispatch()

    const valName = () => {
        if (checkName.length <= 3) {
            return true
        }
    }
    const valAddress = () => {
        if (checkAddress.length < 5) {
            return true
        }
    }

    const valNumber = () => {
        if (checkTelNumber.length < 10) {
            return true
        }
    }

    const checkValidate = () => {
        if (
            valAddress() || valNumber() || valName()
        ) {

            return false
        } else {
            return true
        }
    }

    const setAddress = () => {
        dispatch(addressAdded({ user_name: checkName, address: checkAddress, tel_number: checkTelNumber }))
        setActiveStep(1)
    }

    return (
        <>
            <Typography variant='p' align='center' gutterBottom>Shipping Address</Typography>

            <Grid container spacing={2}>

                <Grid xs={12} sm={6} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} fullWidth error={valName()} color={valName() ? 'warning' : 'success'} required type='text' onChange={(e) => setCheckName(e.target.value)} id="standard-basic" label="Customer Name" />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} error={valNumber()} fullWidth color={valNumber() ? 'warning' : 'success'} required type='number' onChange={(e) => setCheckTelNumber(e.target.value)} id="standard-basic" label="Tel. Number" />
                </Grid>
                <Grid xs={12} item>
                    <TextField variant="standard" inputProps={{ style: { fontSize: '14px' } }} InputLabelProps={{ style: { fontSize: '12px' } }} error={valAddress()} fullWidth color={valAddress() ? 'warning' : 'success'} required type='text' onChange={(e) => setCheckAddress(e.target.value)} id="standard-basic" label="Address" />
                </Grid>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', padding: '1rem' }}>
                <div>
                    <Button color={checkValidate() ? 'success' : 'warning'} type="submit" variant="contained" onClick={(e) => { checkValidate() && setAddress() }}>Submit</Button>
                </div>
            </div>
        </>

    )
}

export default AddressForm