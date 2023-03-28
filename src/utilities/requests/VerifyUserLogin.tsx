import axios, { AxiosResponse } from 'axios';

// verify user login is used every time someone logs in to the application
const VerifyUserLogin = async (email: string, password: string): Promise<AxiosResponse | undefined > => {
  const data = {
    email: email,
    password: password,
  }

  try {
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/login-register/verify-credentials/',
      data
    )

    // store token in local storage
    const token = response.data.token;
    localStorage.setItem('token', token);

    return response;
  } catch (error) {
    console.error('Error:', error);
    
  }
}

export default VerifyUserLogin;