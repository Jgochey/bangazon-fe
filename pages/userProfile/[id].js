import { useState, React, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getProductsByUser, getUser } from '../../src/api/callData';

export default function ProfilePage({ id }) {
  const [newUser, setNewUser] = useState(id);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    getProductsByUser(id).then(setUserProducts);
  }, [id]);

  useEffect(() => {
    getUser(id).then(setNewUser);
  }, [id]);

  return (
    <div>
      <h1>{newUser.name}</h1>
      <h3>{newUser.email}</h3>
      <h3>{newUser.phone}</h3>

      <div>Products for sale:</div>
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <strong>Title: </strong>
          </div>
          <div className="col">
            <strong>Product Description: </strong>
          </div>
          <div className="col">
            <strong>Price: </strong>
          </div>
        </div>
        {userProducts
          && userProducts.map((post) => (
            <>
              <div className="row text-center" key={post.id}>
                <div className="col">
                  <Link href={`/productDetails/${post.id}`} passHref>
                    <a href={`/productDetails/${post.id}`} style={{ color: 'blue' }}> {post.title}
                    </a>
                  </Link>
                </div>
                <div className="col">{post.description}</div>
                <div className="col">${post.pricePerUnit}</div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  id: PropTypes.number.isRequired,
};

// This async function should be called before the component is rendered. This will convert the id from a string to a number.
export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      id: parseInt(id, 10),
    },
  };
}
