import axios, { AxiosResponse } from 'axios';

const AddPersonalBests = async (pb100: string, pb500: string, pb1000: string, pb2000: string, pb6000: string, pb10000: string): Promise<AxiosResponse | undefined > => {

  const data = {
    pb_100: pb100,
    pb_500: pb500,
    pb_1000: pb1000,
    pb_2000: pb2000,
    pb_6000: pb6000,
    pb_10000: pb10000
  }

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      'http://localhost:8000/add-user-details/personal-bests/', 
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
    console.log('AddPersonalBests error:', error);
  }
}

export default AddPersonalBests;