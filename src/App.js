import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Nav from './components/pages/Nav';
import Home from './components/pages/Home';
import Details from './components/pages/Details';
import Cart from './components/pages/Cart';
import Categories from './components/pages/Categories';
import CategoriesProds from './components/pages/CategoriesProds';
import Store from './components/pages/Store';
import StoreProd from './components/pages/StoreProd';


const App = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className="app">

      <div className='fixPositionNav'>
        <Nav />
      </div>

      <div className='routes'>
        <Routes>
          <Route path='/register' element={!currentUser ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/cart' element={currentUser ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/stores' element={<Store />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id/products/:id' element={<Details />} />
          <Route path='/store/:id/products/:id' element={<Details />} />
          <Route path='/categories/:id/products' element={<CategoriesProds />} />
          <Route path='/store/:id/products' element={<StoreProd />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
