import axios, { AxiosResponse } from 'axios';

const GetSAndCChartData = async (exercise: string): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  const exerciseParam = exercise.replace(' ', '_').toLowerCase();

  try {
    
    const response = await axios.post(
      `https://z12-backend-production.up.railway.app/chart-data/populate-s-and-c-analysis-chart/?exercise=${exerciseParam}`, 
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
    console.error('GetSAndCChartData error:', error);
  }
}

export default GetSAndCChartData;