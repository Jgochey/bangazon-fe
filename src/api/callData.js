import 'firebase/auth';
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

const getProductsByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/seller/${id}`, {
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

const getUserFromProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/user/${id}/byproduct`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const postProduct = (product) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const updateProduct = (product) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

// checkUser and registerUser are used for authentication with firebase, check that it works properly with the register form.
const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser?uid=${uid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  // .then((resp) => resolve(resp.json()))
    .then((resp) => {
      if (resp.ok) {
        resolve(resp.json());
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

// const registerUser = (userInfo) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/users`, {
//     method: 'POST',
//     body: JSON.stringify(userInfo),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   })
//   // .then((resp) => resolve(resp.json()))
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  console.warn('Registering user with info:', userInfo);
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Network response was not ok: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.warn('User registered successfully:', data);
      resolve(data);
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      reject(error);
    });
});

// const updateUser = (userInfo, id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/users/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(userInfo),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   })
//   // .then((resp) => resolve(resp.json()))
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

// const registerUser = (userInfo) => new Promise((resolve, reject) => {
//   console.log('Registering user with info:', userInfo);
//   fetch(`${clientCredentials.databaseURL}/users`, {
//     method: 'POST',
//     body: JSON.stringify(userInfo),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log('User registered successfully:', data);
//       resolve(data);
//     })
//     .catch((error) => {
//       console.error('Error registering user:', error);
//       reject(error);
//     });
// });

// const updateUser = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/users/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => resolve(data))
//     .catch((error) => reject(error));
// });

export {
  getProducts, getRecentProducts, getProduct, getUserFromProduct, getUser, getUsers, getProductsByUser, getCategories, postProduct, updateProduct, registerUser, checkUser,
};
