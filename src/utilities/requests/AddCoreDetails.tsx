import axios, { AxiosResponse } from 'axios';

const AddCoreDetails = async (firstName: string, lastName: string, dateOfBirth: string, gender: string, phoneNumber: string, athleteOrCoach: string): Promise<AxiosResponse | undefined > => {

  const data = {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dateOfBirth,
    gender: gender,
    phone_number: phoneNumber,
    athlete_or_coach: athleteOrCoach
  }

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'http://localhost:8000/add-user-details/core-details/', 
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
    console.log('AddCoreDetails error:', error);
  }
}

export default AddCoreDetails;