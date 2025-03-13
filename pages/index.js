import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import { signOut } from '../src/utils/auth';
import Signin from '../src/components/Signin';
import LatestProducts from '../src/components/LatestProducts';
import { getRecentProducts } from '../src/api/callData';

function Home() {
  const [user, setUser] = useState(null);
  const [productData, setProductData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getRecentProducts().then(setProductData);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((users) => {
      setUser(users);
    });

    return () => unsubscribe();
  }, []);

  function sellItemBtn() {
    router.push('/selling');
  }

  if (!user) {
    return <Signin />;
  }

  return (
    <>

      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '40vh',
          padding: '30px',
          maxWidth: '300px',
          margin: '0 auto',
        }}
      >
        <h1> Welcome to Bangazon, {user.displayName}!</h1>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
        <p>Click on a product to view item information or Click on a seller to see all the products they have available.</p>
      </div>
      <Button variant="primary" type="button" size="lg" className="copy-btn" onClick={() => sellItemBtn()}>
        Sell an Item
      </Button>
      <LatestProducts productData={productData} />
    </>
  );
}

export default Home;
