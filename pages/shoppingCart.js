import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import GetUsername from '../src/components/GetUsername';
import { getProduct } from '../src/api/callData';

export default function ShoppingCartPage() {
  const [cart, setCart] = useState([]);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // Retrieve the cart data from localStorage and turn it into a JavaScript object.
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    // Get the product data for each item in the cart.
    storedCart.forEach((item) => {
      getProduct(item.id).then((data) => {
        setProductData((prevData) => ({
          ...prevData,
          [item.id]: data,
        }));
      });
    });
  }, []);

  const deleteItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    // Update the cart in localStorage after removing the item.
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <div>Current Items in your Cart:</div>
      {cart.map((item) => (
        <Card key={item.id}>
          <Card.Body>
            <Link href={`/productDetails/${item.id}`} passHref>
              <Card.Title as="a" style={{ color: 'blue', cursor: 'pointer' }}>
                {item.title}
              </Card.Title>
            </Link>

            <Card.Text>Price: ${item.price}</Card.Text>

            <Card.Text>Sold by: </Card.Text>
            {productData[item.id] ? (
              <Link href={`/userProfile/${productData[item.id].sellerId}`} passHref>
                <a href={`/userProfile/${productData[item.id].sellerId}`} style={{ color: 'blue' }}>
                  <GetUsername sellerId={productData[item.id].sellerId} />
                </a>
              </Link>
            ) : (
              <div>Loading seller info...</div>
            )}

            <div style={{ marginTop: '10px' }}>
              <Button style={{ marginLeft: 'auto', display: 'block' }} onClick={() => deleteItem(item.id)}>Delete</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
