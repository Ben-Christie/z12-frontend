import axios, { AxiosResponse } from 'axios';

const UploadProfilePicture = async (profile_picture: Blob): Promise<AxiosResponse | undefined > => {

  const formData = new FormData();
  formData.append('profile_picture', profile_picture, profile_picture.name);

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      'https://z12-backend-production.up.railway.app/add-user-details/upload-profile-picture/', 
      formData, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response;
  } catch (error) {
    console.error('UploadProfilePicture error:', error);
  }
}

export default UploadProfilePicture;