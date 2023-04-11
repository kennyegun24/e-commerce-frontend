import React, { useState } from 'react'
import { Form, FormBtn, FormDiv, H1, Input, P } from '../../Styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/apiCalls'
import { loginFailure } from '../../redux/user/user'
import { FaLock, FaLockOpen, FaRegEnvelope, FaUser } from 'react-icons/fa'
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
          user: {
            email,
            password,
            name
          }
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
      <form className='loginForm'>
        <H1>Create an account</H1>
        <div className='emailDiv'>
          <input className='loginInput' type='text' onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
          <FaUser className='mailLock' />
        </div>

        <div className='emailDiv'>
          <input className='loginInput' type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
          <FaRegEnvelope className='mailLock' />
        </div>

        <div className='emailDiv'>
          <input className='loginInput' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
          <FaLockOpen className='mailLock' />
        </div>

        <div className='emailDiv'>
          <input className='loginInput' type='password' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
          <FaLock className='mailLock' />
        </div>

        <button className='loginBtn' onClick={registerUser}>Register</button>
        {err && setTimeout(() => { setErr(null) }, 5000) && <span style={{ color: 'red', fontWeight: '600' }}>{err}</span>}
        {success && setTimeout(() => { setSuccess(null) }, 5000) && <span style={{ color: 'green', fontWeight: '600' }}>{success}</span>}
        <P>Have an account? <Link to='/login'>Login...</Link></P>
      </form>
    </FormDiv>
  )
}

export default Register;