import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {Col, Container, Row, Form, Button} from 'react-bootstrap';

const ProductDetail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  const getProductDetail = async () => {
    let url = `http://localhost:5000/products/${id}`;
    let res = await fetch(url);
    let data = await res.json();
   console.log("ProductDetail.jsx: 14", data);
    setProduct(data);
  };

  // ⭐ 드롭다운 사이즈 변경 핸들러
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {

    getProductDetail();
  },[]);

  //todo
  function handleAddToCart() {

  }

  return (
      <Container>
        <Row>
          <Col className="product-img">
            <img src={product?.img} alt={product?.title}/>
          </Col>
          <Col>
            <h2>{product?.title}</h2>
            <h2>${product?.price}</h2>
            <h6>{product?.choice? "Designer Recommend" : ""}</h6>
            {/* ⭐ 드롭다운 (사이즈 선택) */}
            {product?.size && product?.size.length > 0 && (
                <div className="product-options mt-4">
                  <Form.Select
                      aria-label="Select size"
                      className="product-size-select"
                      onChange={handleSizeChange}
                      value={selectedSize}
                  >
                    <option value="">사이즈 선택</option> {/* 기본 안내 옵션 */}
                    {product.size.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                    ))}
                  </Form.Select>
                </div>
            )}
            <Button variant="dark" className="add-to-cart-btn mt-4" onClick={handleAddToCart}>
              장바구니에 담기
            </Button>
          </Col>

        </Row>
      </Container>
  )
}
export default ProductDetail
