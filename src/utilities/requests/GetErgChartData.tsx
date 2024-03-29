import axios, { AxiosResponse } from 'axios';

const GetErgChartData = async (distance: string): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      `http://localhost:8000/chart-data/populate-erg-analysis-chart/?distance=${distance}`, 
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
    console.error('GetErgChartData error:', error);
  }
}

export default GetErgChartData;