import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { signOut } from '../src/utils/auth';
import Signin from '../src/components/Signin';
import NavBar from '../src/components/NavBar';
import UserProfile from '../src/app/UserProfile/[uid]/page';
// import { useAuth } from '../src/utils/context/authContext';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((users) => {
      setUser(users);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Signin />;
  }

  if (user) {
    return (
      <>
        <NavBar />
        <UserProfile />
      </>
    );
  }

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
