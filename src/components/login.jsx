import axios from 'axios';

const login = async (email, password) => {
  try {
    const response = await axios.post('https://documenter.getpostman.com/view/21013764/2sA2xjzWRD/main/v1/account/login?populate=detail', {
      email,
      password
    });
    return response.data.token;  // Assuming the token is returned directly for simplicity
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
