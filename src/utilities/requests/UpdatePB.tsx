import axios, { AxiosResponse } from 'axios';

const UpdatePB = async (distance: string, time: string): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  const data = {
    distance: distance,
    time: time
  }

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/update-info/update-pb/', 
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response;
  } catch (error) {
    console.error('UpdatePB error:', error);
  }
}

export default UpdatePB;