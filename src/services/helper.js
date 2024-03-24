// helper.js

let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  // Use the Render URL for production
  BASE_URL = 'https://logincrudbackend.onrender.com';
} else {
  // Use localhost URL for development
  BASE_URL = 'http://localhost:5001';
}

export { BASE_URL };
