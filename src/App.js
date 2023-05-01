import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Nav from './components/pages/Nav';
import Home from './components/pages/Home';
import Details from './components/pages/Details';
import Cart from './components/pages/Cart';
import Categories from './components/pages/Categories';
import Store from './components/pages/Store';
import StoreProd from './components/pages/StoreProd';
import PaymentForm from './components/pages/PaymentForm/PaymentForm';

const App = () => {
  const { currentUser } = useSelector(state => state.user)

  const location = useLocation()

  const getLocation = location.pathname
  return (
    <div className="app">

      {(getLocation !== '/login' && getLocation !== '/register') && <div className='fixPositionNav'>
        <Nav />
      </div>}

      <div className={getLocation === '/login' || getLocation === '/register' ? 'routes fullPage' : 'routes'}>
        <Routes>
          <Route path='/register' element={!currentUser ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/cart' element={currentUser ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/stores' element={<Store />} />
          <Route path='/payment' element={<PaymentForm />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id/products/:id' element={<Details />} />
          <Route path='/store/:id/products/:id' element={<Details />} />
          <Route path='/store/:id/products' element={<StoreProd />} />
          <Route path='/categories/:id/products' element={<StoreProd />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
