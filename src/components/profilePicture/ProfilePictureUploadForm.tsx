import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../../utilities/appRoutes";
import SubmitButton from "../buttons/SubmitButton";
import UploadFileButton from "../buttons/UploadFileButton";
import NavigatorButton from "../buttons/NavigatorButton";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import UploadProfilePicture from "../../utilities/requests/UploadProfilePicture";

const ProfilePictureUploadForm = () => {
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [blobObject, setBlobObject] = useState<Blob>(new Blob());
  const [errorMessage, setErrorMessage] = useState('');
  const [culprit, setCulprit] = useState('');
  
  const handleFileSelect = (file: File) => {
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageData = event?.target?.result;

      if (!imageData) {
        console.error('Error: imageData is undefined.');
        return;
      }

      // Convert the image data to a Blob object
      const blob = new Blob([imageData], { type: 'image/jpeg' });

      setBlobObject(blob);

      // Convert the Blob object to a data URL
      const dataURL = URL.createObjectURL(blob);

      setProfilePicture(dataURL);

      // Create an <img> element and set its src attribute to the data URL
      const img = document.createElement('img');
      img.src = dataURL;

      // Set the img element's style properties
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '6px';

      // Append the <img> element to a <div> element
      const div = document.getElementById('profile-picture-div');
      if (div) {
        div.innerHTML = ''; // Clear any existing content from the div
        div.appendChild(img);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {}, [blobObject]);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(profilePicture !== null) {
      const response = await UploadProfilePicture(blobObject);

      if(!AllValuesDefined(response?.data)) {
        console.error('Error: response from component ProfilePictureUploadForm has undefined value');
      } else {
        const data = response?.data;
        setErrorMessage(data.errorMessage);
        setCulprit(data.culprit);
      }
    }

    if(errorMessage === '' && culprit === '') {
      navigate(getRouteByTitle('Athlete Details').path);
    } else {
      console.error('Unable to navigate from component: ProfilePictureUploadForm.tsx');
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-45% rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">Upload Profile Picture</div>

      <div id="profile-picture-div" className="border-orange-400 border-2 bg-white w-1/3 h-40% mt-10 mb-24 rounded-lg">
        {/* display profile picture */}
      </div>


      <div className="flex items-center w-35% mb-11">
        <UploadFileButton onFileSelect={handleFileSelect} />
        <SubmitButton title="Submit" />
        <NavigatorButton title="Skip" bgColor="bg-white" textColor="text-black" navigateTo="Athlete Details" />
      </div>
    </form>
  )
}

export default ProfilePictureUploadForm;