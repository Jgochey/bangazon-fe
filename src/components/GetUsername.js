import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api/callData';

export default function GetUsername({ sellerId }) {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (sellerId) {
      getUser(sellerId).then((user) => {
        setUsername(user.name);
      });
    }
  }, [sellerId]);

  return <span>{username}</span>;
}

GetUsername.propTypes = {
  sellerId: PropTypes.number.isRequired,
};
