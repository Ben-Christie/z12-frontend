import axios, { AxiosResponse } from 'axios';

const AddErgData = async (distance: string, strokesPerMinute: string, time: string): Promise<AxiosResponse | undefined > => {

  const data = {
    distance: distance,
    strokes_per_minute: strokesPerMinute,
    time: time
  }

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/gather-metrics/add-erg-metric/', 
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
    console.error('AddErgData error:', error);
  }
}

export default AddErgData;