import React from 'react';

const ProductCard = ({ product }) => {
  return (
      <>
        <img src={product.img} alt={product.title} /> {/* alt 속성을 추가하는 것이 좋습니다. */}

        {/* product.choice가 true일 때만 div를 렌더링, 아니면 null (아무것도 렌더링하지 않음) */}
        {product.choice ? (
            <div>Designer Recommended</div>
        ) : <div>      </div>}

        <div>{product.title}</div> {/* JavaScript 변수는 중괄호로 감싸야 합니다. */}
        <div>${product.price}</div>

        {/* product.new가 true일 때만 div를 렌더링, 아니면 null */}
        {product.new ? (
            <div>new</div>
        ) : <div>         </div>}
      </>
  );
};

export default ProductCard;