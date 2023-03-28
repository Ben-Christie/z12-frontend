import axios, { AxiosResponse } from 'axios';

const GetUserDetails = async (): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/populate-dashboard/get-user-details/', 
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

export default GetUserDetails;