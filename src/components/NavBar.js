/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
      <Container className="navbarContainer">
        <Link href="/" passHref>
          <Navbar.Brand className="navbar-brand">Brand</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/checkout" passHref>
              <Nav.Link>Checkout</Nav.Link>
            </Link>
            <Link href="/orderHistory" passHref>
              <Nav.Link>Order History</Nav.Link>
            </Link>
            <Link href="/productDetails" passHref>
              <Nav.Link>Product Details</Nav.Link>
            </Link>
            <Link href="/profile" passHref>
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link href="/registration" passHref>
              <Nav.Link>Registration</Nav.Link>
            </Link>
            <Link href="/searchResults" passHref>
              <Nav.Link>Search Results</Nav.Link>
            </Link>
            <Link href="/selling" passHref>
              <Nav.Link>Selling</Nav.Link>
            </Link>
            <Link href="/shoppingCart" passHref>
              <Nav.Link>Shopping Cart</Nav.Link>
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut} className="signoutBtn">
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// export default function NavBar() {
//   return (
//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//       <Container>
//         <Link passHref href="/">
//           <Navbar.Brand>CHANGE ME</Navbar.Brand>
//         </Link>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
//             <Link passHref href="/">
//               <Nav.Link>Home</Nav.Link>
//             </Link>
//             <Link passHref href="/Checkout">
//               <Nav.Link>Checkout</Nav.Link>
//             </Link>
//             <Button variant="danger" onClick={signOut}>
//               Sign Out
//             </Button>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }
