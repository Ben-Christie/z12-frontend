import axios, { AxiosResponse } from 'axios';

const CreateUserLogin = async (email: string, password: string, confirmPassword: string): Promise<AxiosResponse | undefined > => {
  const data = {
    email: email,
    password: password,
    confirm_password: confirmPassword, 
  }

  try {
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/login-register/create-login/',
      data
    );

    // store token in local storage
    const token = response.data.token;
    localStorage.setItem('token', token);

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default CreateUserLogin;