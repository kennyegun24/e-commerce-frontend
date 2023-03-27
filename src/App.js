import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      {/* <Login /> */}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
