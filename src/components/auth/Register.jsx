import React, { useState } from 'react'
import { Form, FormBtn, FormDiv, H1, Input, P } from '../../Styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/apiCalls'
import { loginFailure } from '../../redux/user/user'
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [err, setErr] = useState(null)
  const [success, setSuccess] = useState(null)
  const dispatch = useDispatch()

  const registerUser = async (e) => {
    e.preventDefault()
    if (name === '' && password === '' && email === '') {
      setErr('Complete all fields to register')
      return false
    } if (name === '') {
      setErr('Name field should be filled')
      return false
    } if (email === '') {
      setErr('Email field shoulb be filled')
      return false
    } if (!email.match(/^[a-z-A-Z-0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z-0-9-]*\.[a-z]+(?:\.[a-z-0-9-]+)*$/)) {
      setErr('Email should be valid')
      return false
    } if (password === '') {
      setErr('Password cannot be empty')
      return false
    } if (password.length < 8) {
      setErr('password should be more than 8 characters')
      return false
    }
    if (!confirmPassword.match(password)) {
      setErr('Passwords dont match')
      return false
    }
    else {
      try {
        await register(dispatch, {
          email,
          password,
          name
        })
        setSuccess('User created')
      } catch (err) {
        dispatch(loginFailure())
        setErr(err.response.data.message)
      }
    }
  }

  return (
    <FormDiv>
      <Form>
        <H1>Create an account</H1>
        <Input onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
        <Input onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
        <Input onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
        <Input onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
        <FormBtn onClick={registerUser}>Register</FormBtn>
        {err && setTimeout(() => { setErr(null) }, 5000) && <span style={{ color: 'red', fontWeight: '600' }}>{err}</span>}
        {success && setTimeout(() => { setSuccess(null) }, 5000) && <span style={{ color: 'green', fontWeight: '600' }}>{success}</span>}
        <P>Have an account? <Link to='/'>Login...</Link></P>
      </Form>
    </FormDiv>
  )
}

export default Register;