import axios, { AxiosResponse } from 'axios';

const GetUserDetailsDashboard = async (): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'http://localhost:8000/populate-dashboard/get-user-details/', 
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
    console.error('GetUserDetailsDashboard error:', error);
  }
}

export default GetUserDetailsDashboard;