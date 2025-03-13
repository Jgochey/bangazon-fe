import React from 'react';
import Link from 'next/link';
import { useAuth } from '../src/utils/context/authContext';
import SellingForm from '../src/components/SellingForm';

export default function SellingPage() {
  const user = useAuth();
  const { user: { id } } = user;

  if (!user) {
    return (
      <>
        <h1>You are not logged in!</h1>
        <p>Please log in to sell items</p>
        <Link href="/registration">Click here to register</Link>
      </>

    );
  }

  return (
    <><div>Selling page</div><SellingForm newUser={id} /></>
  );
}
