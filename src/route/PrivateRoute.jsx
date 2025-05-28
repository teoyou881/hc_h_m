import React from 'react'
import ProductDetail from '../page/ProductDetail.jsx';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({auth}) => {
  return auth === true ? <ProductDetail/> : <Navigate to={'/hc_h_m/login' }/>;

};
export default PrivateRoute
