import classNames from "classnames";
import GetUserDetails from "../../utilities/requests/GetUserDetails";
import GetProfilePicture from "../../utilities/requests/GetProfilePicture";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import { useEffect, useState } from "react";
import { RiSettings3Fill } from "react-icons/ri";

interface Props {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDashboardDetails = ({setModalState}: Props) => {
  const userDetail = (title: string, value: string, divSize: string, borderBT?: string, borderR?: string) => {
    return (
      <div className={classNames('border-white', `${borderR}`, `${borderBT}`, 'text-lg', 'flex', 'items-center', 'pl-5', 'py-1', `${divSize}`)}>
        <p className="pr-3 font-semibold text-orange-400">{title} :</p>
        <p className="text-white">{value}</p>
      </div>
    )
  }

  const unpackDetailArrays = (title: string, array: string[]): JSX.Element => {
    let result = ''

    for(let i = 0; i < array.length; i++) {
      if(array.length - 1 === i) {
        result += array[i]
      } else {
        result += `${array[i]} / `
      }
    }

    return (
      <div className="border-2 rounded-lg col-span-10 row-span-1 ml-5 grid grid-cols-4 mt-1 content-center">
        <div className="border-white border-r-2 text-lg text-orange-400 font-semibold flex justify-center items-center">{title}</div>
        <div className="col-span-3 text-lg flex justify-center items-center text-white">{result}</div>
      </div>
    )
  }

  // handle data response from backend
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [raceCategory, setRaceCategory] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [wingspan, setWingspan] = useState<string>('');
  const [clubs, setClubs] = useState<string[]>([]);
  const [coaches, setCoaches] = useState<string[]>([]);

  const getData = async () => {
    const response = await GetUserDetails()

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function GetUserDetails has undefined value');
    } else {
      const data = response?.data;

      setFullName(data.fullName);
      setAge(data.ageDob);
      setRaceCategory(data.raceCategory);
      setHeight(data.height);
      setWeight(data.weight);
      setWingspan(data.wingspan);
      setClubs(data.clubs);
      setCoaches(data.coaches);

    }
  }

  const getProfilePicture = async () => {
    const response = await GetProfilePicture();

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function AddCoreDetails has undefined value');
    } else {
      const data = response?.data;

      const imageData = data.imageData;
      const contentType = data.contentType;

      const imgElement = document.getElementById('profile-picture');

      if (imgElement instanceof HTMLImageElement) {
        imgElement.src = `data:${contentType};base64,${imageData}`;

        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'fill';
        imgElement.style.borderRadius = '6px';
      }

    }
  }

  useEffect(() => {
    getData();
    getProfilePicture();
  }, []);

  return (
    <div className="rounded-lg p-3 mt-5 col-span-8 row-span-2 bg-z12-gray grid grid-cols-12 grid-rows-5">
      <div className="rounded-lg border-2 row-span-5 col-span-2 mr-2 overflow-hidden">
        <img id="profile-picture" />
      </div>

      <div className="border-2 rounded-lg row-span-3 col-span-10 ml-5 grid grid-cols-6 grid-rows-3 mb-1">
        {userDetail('Name', fullName, 'col-span-3', 'border-b-2', 'border-r-2')}
        {userDetail('Weight', weight, 'col-span-2', 'border-b-2')}
        
        <p className=" text-3xl flex justify-end items-center transition-all duration-200 ease-in-out transform hover:text-orange-400 cursor-pointer text-white pr-2 border-b-2 border-white mb-0.25"><RiSettings3Fill onClick={() => setModalState(true)}/></p>
        
        {userDetail('Age', age, 'col-span-3', 'border-b-2', 'border-r-2')}
        {userDetail('Height', height, 'col-span-3', 'border-b-2')}
        {userDetail('Category', raceCategory, 'col-span-3', undefined, 'border-r-2')}
        {userDetail('Wingspan', wingspan, 'col-span-3')}
      </div>

      {unpackDetailArrays('My Club', clubs)}
      {unpackDetailArrays('My Coaches', coaches)}

    </div>
  )
}

export default UserDashboardDetails;