import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getRecentProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/recent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export { getProducts, getRecentProducts, getProduct };
