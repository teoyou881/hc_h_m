import React, {useEffect, useState} from 'react'
import ProductCard from '../component/ProductCard.jsx';
import {Col, Container, Row} from 'react-bootstrap';

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
        <Container>
          <Row>
            {productList.map((item, index) => (
                <Col lg={3} md={4} sm={6} xs={12} key={index}>
                <ProductCard key={index} product={item}/>
                </Col>
            ))}
          </Row>

        </Container>

      </>
  )
}
export default ProductAll
