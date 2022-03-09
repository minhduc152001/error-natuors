/* eslint-disable */
import { axios } from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
