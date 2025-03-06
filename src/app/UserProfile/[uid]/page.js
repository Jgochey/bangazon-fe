'use client';

import PropTypes from 'prop-types';

export default function LatestProducts({ productData }) {
  return (
    <div>

      <h4>Check out our latest products</h4>

      {/* Update this to be a card for each item */}
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <strong>Title: </strong>
          </div>
          <div className="col">
            <strong>Sold by: </strong>
          </div>
          <div className="col">
            <strong>Description: </strong>
          </div>
          <div className="col">
            <strong>Category: </strong>
          </div>
          <div className="col">
            <strong>Price: </strong>
          </div>
          <div className="col">
            <strong>Units left in stock: </strong>
          </div>
        </div>
        {productData
          && productData.map((post) => (
            <div className="row text-center" key={post.id}>
              <div className="col">{post.title}</div>
              <div className="col">{post.sellerId}</div>
              <div className="col">{post.description}</div>
              <div className="col">{post.categoryId}</div>
              <div className="col">{post.pricePerUnit}</div>
              <div className="col">{post.unitsAvailable}</div>
            </div>
          ))}
      </div>

    </div>
  );
}

LatestProducts.propTypes = {
  productData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      sellerId: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      categoryId: PropTypes.number.isRequired,
      pricePerUnit: PropTypes.number.isRequired,
      unitsAvailable: PropTypes.number.isRequired,
    }),
  ),
};

LatestProducts.defaultProps = {
  productData: [],
};
