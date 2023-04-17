import axios, { AxiosResponse } from 'axios';

const AddAthleteDetails = async (raceCategory: string, clubs: string[], coaches: string[], height: string, weight: string, wingspan: string): Promise<AxiosResponse | undefined > => {

  const data = {
    race_category: raceCategory,
    clubs: clubs,
    coaches: coaches,
    height: height,
    weight: weight,
    wingspan: wingspan
  }

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'http://localhost:8000/add-user-details/athlete-details/', 
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
    console.error('AddAthleteDetails error:', error);
  }
}

export default AddAthleteDetails;