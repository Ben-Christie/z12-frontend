import axios, { AxiosResponse } from 'axios';

const GetDetailsForModal = async (): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/populate-dashboard/populate-details-modal/', 
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
    console.error('GetDetailsForModal error:', error);
  }
}

export default GetDetailsForModal;