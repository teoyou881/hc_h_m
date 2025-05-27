import React from 'react';

const ProductCard = ({ product }) => {
  return (
      <div className="product-card">
        <img src={product.img} alt={product.title} className="product-image" /> {/* alt 속성을 추가하는 것이 좋습니다. */}
        <div>{product?.new==true?"Designer Recommended":""}</div>
        <div>{product.title}</div> {/* JavaScript 변수는 중괄호로 감싸야 합니다. */}
        <div>${product.price}</div>
        <div>{product?.new==true?"New":""}</div>
      </div>
  );
};

export default ProductCard;