import axios, { AxiosResponse } from 'axios';
import { exerciseOptions } from '../sessionModalData';

const AddSAndCData = async (exercise: string, reps: string, weight: string): Promise<AxiosResponse | undefined > => {

  const exerciseList: string[] = [];

  exerciseOptions.forEach(exercise => {
    exerciseList.push(exercise.label);
  });


  const data = {
    exercise: exercise,
    reps: reps,
    weight: weight,
    exercise_list: exerciseList
  }

  const token = localStorage.getItem('token');

  try {
    
    const response = await axios.post(
      'http://localhost:8000/gather-metrics/add-s-and-c-metric/', 
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
    console.error('AddSAndCData error:', error);
  }
}

export default AddSAndCData;