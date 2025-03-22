'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getCategories, getProduct } from '../../src/api/callData';
import GetUsername from '../../src/components/GetUsername';
import { useAuth } from '../../src/utils/context/authContext';

export default function ProductDetailsPage({ id }) {
  const [productData, setProductData] = useState(null);
  const [userStatus, setUserStatus] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const user = useAuth();
  const { user: { isRegistered } } = user;

  // Check to see if the user has registered. If not, keep userStatus as false. If so, set userStatus to true.
  useEffect(() => {
    if (isRegistered === true) {
      setUserStatus(true);
    }
  }, [isRegistered]);

  useEffect(() => {
    getProduct(id).then(setProductData);
  }, [id]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategoryList(categories);
    }).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, []);

  if (!productData) {
    return <div>Loading...</div>;
  }

  function addToCart() {
    if (userStatus === false) {
      router.push('/registration');
    } else {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const item = {
        id: productData.id,
        title: productData.title,
        price: productData.pricePerUnit,
        sellerId: productData.sellerId,
      };

      // Add the item to the cart array
      cart.push(item);

      // Save the updated cart back to localStorage.
      localStorage.setItem('cart', JSON.stringify(cart));

      router.push('/shoppingCart');
    }
  }

  return (
    <>
      <div>
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <strong> {productData.title} </strong>
            </div>
            <div className="col">
              <strong>Sold by: </strong>
              <Link href={`/userProfile/${productData.sellerId}`} passHref>
                <a href={`/userProfile/${productData.sellerId}`} style={{ color: 'blue' }}>
                  <GetUsername sellerId={productData.sellerId} />
                </a>
              </Link>
            </div>
            <div className="col">
              <strong> {productData.description} </strong>
            </div>
            <div className="col">
              <strong>Category: </strong>
              {categoryList.length > 0 && productData.categoryId
                ? categoryList.find((category) => category.id === productData.categoryId)?.name || 'Unknown Category' : 'Loading Category...'}
            </div>
          </div>
          <div className="col">
            <strong> {productData.pricePerUnit} </strong>
          </div>
          <div className="col">
            <strong>Units left in stock: </strong>
            {productData.unitsAvailable}
          </div>
        </div>
      </div><Button variant="primary" type="button" size="lg" className="copy-btn" onClick={() => addToCart()}>Add to Cart</Button>
    </>
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
