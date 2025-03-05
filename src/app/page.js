'use client';

import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import SignIn from '../components/Signin';
import { firebase } from '../utils/client';
import NavBar from '../components/NavBar';
import { getRecentProducts } from '../api/callData';

function Home() {
  const [user, setUser] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    getRecentProducts().then(setProductData);
  }, []);

  console.warn(productData);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((users) => {
      setUser(users);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <SignIn />;
  }

  // if (user) {
  //   return (
  //     <>
  //       <NavBar />
  //       <UserProfile />
  //     </>
  //   );
  // }

  return (
    <>
      <NavBar />

      <h1>Welcome to Bangazon!</h1>

      <h4>Check out our latest products</h4>

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
              <div className="col">{post.Title}</div>
              <div className="col">{post.SellerId}</div>
              <div className="col">{post.Description}</div>
              <div className="col">{post.CategoryId}</div>
              <div className="col">{post.PricePerUnit}</div>
              <div className="col">{post.UnitsAvailable}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;

// public int Id { get; set; }

// public int SellerId { get; set; }

// public int CategoryId { get; set; }

// public string Title { get; set; }

// public string Description { get; set; }

// public decimal PricePerUnit { get; set; }

// public int UnitsAvailable { get; set; }
