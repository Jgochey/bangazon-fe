import React, { useState } from 'react';
import { Button, Card, Dropdown } from 'react-bootstrap';

export default function CheckoutPage() {
  const userCart = JSON.parse(localStorage.getItem('cart')) || [];
  const shoppingTotal = userCart.reduce((acc, item) => acc + item.price, 0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Select Payment Method');

  const confirmationMessage = () => {
    alert('Your purchase has been confirmed. Thank you for shopping with us!');
    // Clear the user's cart from localstorage, wait 4 seconds, then redirect to the home page.
    localStorage.removeItem('cart');
    setTimeout(() => {
      window.location.href = '/';
    }, 4000);
  };

  const handleSelect = (eventKey) => {
    setSelectedPaymentMethod(eventKey);
  };

  return (
    <div>
      <h1>Checkout</h1>
      {userCart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          <div>Current Items in your Cart:</div>
          {userCart.map((item) => (
            <Card key={item.id}>
              <Card.Body>
                <div>{item.title}</div>
                <div>Price: ${item.price}</div>
              </Card.Body>
            </Card>
          ))}
          <h3>Total: ${shoppingTotal}</h3>
          <div>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedPaymentMethod}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Paypal">Paypal</Dropdown.Item>
                <Dropdown.Item eventKey="Credit Card">Credit Card</Dropdown.Item>
                <Dropdown.Item eventKey="Mail">Mail</Dropdown.Item>
                <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button onClick={confirmationMessage}>Confirm Purchase</Button>
          </div>
        </div>
      )}
    </div>
  );
}
