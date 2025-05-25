import './App.css'
import Navbar from './component/Navbar.jsx';
import {Route, Routes} from 'react-router-dom';
import ProductAll from './page/ProductAll.jsx';
import Login from './page/Login.jsx';
import ProductDetail from './page/ProductDetail.jsx';
import {useState} from 'react';

function App() {



  return (
      <>
        <Navbar></Navbar>
        <Routes>
          <Route path="/hc_h_m/" element={<ProductAll/>}></Route>
          <Route path="/hc_h_m/login" element={<Login/>}></Route>
          <Route path="/hc_h_m/product/:id" element={<ProductDetail/>}></Route>
        </Routes>

      </>
  )
}

export default App
