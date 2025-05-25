import React, {useEffect, useState} from 'react'

const ProductAll = () => {

  const [productList, setProductList] = useState([]);

  const getProducts = async () => {
    let url = 'http://localhost:5000/products';
    let response = await fetch(url);
    let data = await response.json();
    console.log('ProductAll.java: 7 ', data);
    setProductList(data);

  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
      <></>
  )
}
export default ProductAll
