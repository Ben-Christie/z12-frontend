import axios, { AxiosResponse } from 'axios';

// this file will hold all the functions that are used to interact with the API

// create user login is used when someone registers for the first time
export const createUserLogin = async (email: string, password: string, confirmPassword: string): Promise<AxiosResponse | undefined > => {
  const data = {
    email: email,
    password: password,
    confirm_password: confirmPassword, 
  }

  try {
    const response = await axios.post(
      'http://localhost:8000/login-register/create-login/',
      data
    );
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// verify user login is used every time someone logs in to the application
export const verifyUserLogin = async (email: string, password: string): Promise<AxiosResponse | undefined > => {
  const data = {
    email: email,
    password: password,
  }

  try {
    const response = await axios.post(
      'http://localhost:8000/login-register/verify-credentials/',
      data
    )
    return response;
  } catch (error) {
    console.error('Error:', error);
    
  }
}

export const updateUserDetails = async (...args: (string | number)[]) => {
  // create an object called data that holds keys that are strings and corresponding values that are stings or numbers
  const data: {[key: string]: string | number} = {};

  for(let i = 0; i < args.length; i += 2) {
    data[args[i]] = args[i+1];
  }

  // todo: add axios request
}