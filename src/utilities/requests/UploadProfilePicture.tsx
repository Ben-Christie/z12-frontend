import axios, { AxiosResponse } from 'axios';

const UploadProfilePicture = async (profile_picture: string): Promise<AxiosResponse | undefined > => {

  const data = {
    profile_picture: profile_picture
  }

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      'http://localhost:8000/add-user-details/upload-profile-picture/', 
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
    console.error('UploadProfilePicture error:', error);
  }
}

export default UploadProfilePicture;