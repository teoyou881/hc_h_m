import React, {useEffect, useState} from 'react'
import ProductCard from '../component/ProductCard.jsx';

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
      <>
        {productList.map((item, index) => (
            <ProductCard key={index} product={productList[index]}/>
        ))}
      </>
  )
}
export default ProductAll
