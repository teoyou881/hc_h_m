import './App.css'
import Navbar from './component/Navbar.jsx';
import {Route, Routes} from 'react-router-dom';
import ProductAll from './page/ProductAll.jsx';
import Login from './page/Login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import PrivateRoute from './route/PrivateRoute.jsx';
import Search from './page/Search.jsx';
import ProductDetail from './page/ProductDetail.jsx';

function App() {

  const [auth, setAuth] = useState(false);

  return (
      <>
        <Navbar></Navbar>
        <Routes>
          <Route path="/hc_h_m/" element={<ProductAll/>}></Route>
          <Route path="/hc_h_m/login" element={<Login setAuth={setAuth} auth={auth}/>}></Route>
          // todo
          //search page 구현
          <Route path="/hc_h_m/search" element={<Search/>}></Route>
          {/*<Route path="/hc_h_m/product/:id" element={<PrivateRoute auth={auth}/>}></Route>*/}
          <Route path="/hc_h_m/product/:id" element={<ProductDetail/>}></Route>
        </Routes>

      </>
  )
}

export default App
