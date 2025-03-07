'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getProduct } from '../../src/api/callData';

export default function ProductDetailsPage({ id }) {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProductData);
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      {/* Update this to be a card for each item */}
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <strong> {productData.title} </strong>
          </div>
          <div className="col">
            <strong>Sold by: </strong>
            {productData.sellerId}
          </div>
          <div className="col">
            <strong> {productData.description} </strong>
          </div>
          <div className="col">
            <strong>Category: </strong>
            {productData.categoryId}
          </div>
          <div className="col">
            <strong> {productData.pricePerUnit} </strong>
          </div>
          <div className="col">
            <strong>Units left in stock: </strong>
            {productData.unitsAvailable}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      id: parseInt(id, 10),
    },
  };
}

// ProductDetailsPage.defaultProps = {
//   id: [],
// };

// import React from 'react';

// export default function ProductDetailsPage() {
//   return (
//     <div>Product Details page</div>
//   );
// }
