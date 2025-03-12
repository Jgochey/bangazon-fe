import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { registerUser } from '../api/callData';

function RegisterForm({ user, newUid }) {
  // const [userCount, setUserCount] = useState(0);

  // useEffect(() => {
  //   getUsers().then((users) => {
  //     setUserCount(users.length);
  //   });
  // }, []);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: 'dontworryaboutit',
    uid: newUid,
    isRegistered: false,
    // id: userCount + 1,
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData, isRegistered: true, Uid: user.uid, Password: 'dontworryaboutit',
    };
    console.warn('Form data:', updatedFormData);
    registerUser(updatedFormData)
      .then(() => router.push('/'))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Sign Up</Form.Label>

        <Form.Control as="textarea" name="Name" required placeholder="Username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control as="textarea" name="Password" required placeholder="Password" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control as="textarea" name="Email" required placeholder="E-Mail" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    Name: PropTypes.string,
    Email: PropTypes.string,
    Password: PropTypes.string,
    uid: PropTypes.string,
    // id: PropTypes.number,
    isRegistered: PropTypes.bool,
  }).isRequired,
  newUid: PropTypes.string.isRequired,
};

export default RegisterForm;
