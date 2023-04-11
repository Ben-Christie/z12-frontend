import axios, { AxiosResponse } from 'axios';

const UpdateUserDetails = async (firstName: string, lastName: string, dateOfBirth: string, gender: string, phoneNumber: string, athleteOrCoach: string, weight: string, height: string, wingspan: string, raceCategory: string, clubs: string[], coaches: string[]): Promise<AxiosResponse | undefined > => {

  const token = localStorage.getItem('token');

  const data = {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dateOfBirth,
    gender: gender,
    phone_number: phoneNumber,
    athlete_or_coach: athleteOrCoach,
    weight: weight,
    height: height,
    wingspan: wingspan,
    race_category: raceCategory,
    clubs: clubs,
    coaches: coaches
  }

  try {
    
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/update-info/update-user-details/', 
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
    console.error('UpdateUserDetails error:', error);
  }
}

export default UpdateUserDetails;