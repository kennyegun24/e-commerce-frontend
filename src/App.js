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
      {/* {currentUser */}
      {/* <div className='fixPositionNav'>
        <Nav />
      </div> */}
      {/* } */}

      {/* <div className='routes'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories/:id/products' element={<CategoriesProds />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/categories/:id/products/:id' element={<Details />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/stores' element={<Store />} />
        </Routes>
      </div> */}
      {currentUser
        && <div className='fixPositionNav'>
          <Nav />
        </div>
      }

      <div className={currentUser ? 'routes' : 'regRoute'}>
        <Routes>
          <Route path='/register' element={currentUser ? <Navigate to='/' /> : <Register />} />
          <Route path='/' element={currentUser ? <Home /> : <Login />} />
          <Route path='/product/:id' element={currentUser ? <Details /> : <Navigate to='/' />} />
          <Route path='/cart' element={currentUser ? <Cart /> : <Navigate to='/' />} />
          <Route path='/stores' element={currentUser ? <Store /> : <Navigate to='/' />} />
          <Route path='/categories' element={currentUser ? <Categories /> : <Navigate to='/' />} />
          <Route path='/categories/:id/products/:id' element={currentUser ? <Details /> : <Navigate to='/' />} />
          <Route path='/store/:id/products/:id' element={currentUser ? <Details /> : <Navigate to='/' />} />
          <Route path='/categories/:id/products' element={currentUser ? <CategoriesProds /> : <Navigate to='/' />} />
          <Route path='/store/:id/products' element={currentUser ? <StoreProd /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
