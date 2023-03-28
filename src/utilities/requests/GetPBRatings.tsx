import axios, { AxiosResponse } from 'axios';

const GetPBRatings = async (): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/populate-dashboard/calculate-pb-rating/', 
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
    console.error('GetPBRatings error:', error);
  }
}

export default GetPBRatings;