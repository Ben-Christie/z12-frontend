import axios, { AxiosResponse } from 'axios';

const GetPersonalBests = async (): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/populate-dashboard/get-personal-bests/', 
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
    console.error('GetPersonalBestsDashboard error:', error);
  }
}

export default GetPersonalBests;