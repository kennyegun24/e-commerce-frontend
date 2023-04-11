import React, { useState } from 'react'
import { Form, FormBtn, FormDiv, H1, Input, P } from '../../Styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/apiCalls'
import { loginFailure } from '../../redux/user/user'
import { FaEnvelope, FaLock, FaRegEnvelope } from 'react-icons/fa'
import './login.css'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const dispatch = useDispatch()

  const loginUser = async (e) => {
    e.preventDefault()
    if (password === '' && email === '') {
      setErr('Complete all fields')
      return false
    } if (email === '') {
      setErr('Email field shoulb be filled')
      return false
    } if (password === '') {
      setErr('Password cannot be empty')
      return false
    }
    try {
      await login(dispatch, {
        email,
        password
      })
      setSuccess('User Logged in successfully')
    } catch (err) {
      dispatch(loginFailure)
      setErr(err.response.data.message)
    }
  }

  return (
    <FormDiv>
      <form className='loginForm'>
        <H1>Login to your account</H1>
        <div className='emailDiv'>
          <input className='loginInput' type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
          <FaRegEnvelope className='mailLock' />
        </div>

        <div className='emailDiv'>
          <input className='loginInput' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
          <FaLock className='mailLock' />
        </div>

        <button className='loginBtn' type='submit' onClick={loginUser}>Login</button>
        {err && setTimeout(() => { setErr(null) }, 5000) && <span style={{ color: 'red', fontWeight: '600' }}>{err}</span>}
        {success && setTimeout(() => { setSuccess(null) }, 5000) && <span style={{ color: 'green', fontWeight: '600' }}>{success}</span>}
        <P>Don't have an account? <Link to='/register'>Register...</Link></P>
      </form>
    </FormDiv>
  )
}

export default Login;