'use client';

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Home from '../../page';

export default function UserProfile() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user display name from Firebase authentication
    const user = firebase.auth().currentUser;
    if (user) {
      setUserName(user.displayName || 'User');
    }
  }, []);
  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {userName}</p>
      <Home />
    </div>
  );
}
