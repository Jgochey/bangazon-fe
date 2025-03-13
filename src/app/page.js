'use client';

import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((users) => {
      setUser(users);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <SignIn />;
  }

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
