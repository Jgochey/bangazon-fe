import React, { useEffect } from 'react';
import RegisterForm from '../src/components/RegisterForm';
import { useAuth } from '../src/utils/context/authContext';

export default function RegistrationPage() {
  const user = useAuth();
  const { user: { isRegistered } } = user;
  const { user: { uid } } = user;

  useEffect(() => {
    console.warn('User object right here baby:', user);
  }, [user]);

  if (isRegistered === true) {
    return (
      <div>
        <h1>You are already logged in!</h1>
      </div>
    );
  }

  return (
    <>
      <div>Registration page</div>
      <RegisterForm user={user} newUid={uid} />
    </>
  );
}
