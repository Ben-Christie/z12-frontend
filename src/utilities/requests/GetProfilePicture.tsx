import axios, { AxiosResponse } from 'axios';

const GetProfilePicture = async (): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'http://localhost:8000/populate-dashboard/get-user-profile-picture/', 
      null,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response;
  } catch (error) {
    console.error('GetProfilePicture error:', error);
  }
}

export default GetProfilePicture;