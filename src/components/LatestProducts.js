'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import GetUsername from './GetUsername';

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
            <strong>Price: </strong>
          </div>
        </div>
        {productData
          && productData.map((post) => (
            <div className="row text-center" key={post.id}>
              <div className="col">
                <Link href={`/productDetails/${post.id}`} passHref>
                  <a href={`/productDetails/${post.id}`} style={{ color: 'blue' }}> {post.title}
                  </a>
                </Link>
              </div>

              <div className="col">
                <Link href={`/userProfile/${post.sellerId}`} passHref>
                  <a href={`/userProfile/${post.sellerId} `} style={{ color: 'blue' }}><GetUsername sellerId={post.sellerId} /></a>
                </Link>

              </div>
              <div className="col">${post.pricePerUnit}</div>
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
