import './App.css'
import Navbar from './component/Navbar.jsx';
import {Route, Routes} from 'react-router-dom';
import ProductAll from './page/ProductAll.jsx';
import Login from './page/Login.jsx';
import ProductDetail from './page/ProductDetail.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';

function App() {

  const [auth, setAuth] = useState(false);

  return (
      <>
        <Navbar></Navbar>
        <Routes>
          <Route path="/hc_h_m/" element={<ProductAll/>}></Route>
          <Route path="/hc_h_m/login" element={<Login setAuth={setAuth} auth={auth}/>}></Route>
          <Route path="/hc_h_m/product/:id" element={<ProductDetail/>}></Route>
        </Routes>

      </>
  )
}

export default App
