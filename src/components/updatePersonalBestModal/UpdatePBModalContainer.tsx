import FormDropdown from "../formFields/FormDropdown";
import { useState } from "react";
import { Option } from "../formFields/FormMultiSelectDropdown";
import TimeInputField from "../formFields/TimeInputField";
import SubmitButton from "../buttons/SubmitButton";
import UpdatePB from "../../utilities/requests/UpdatePB";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../../utilities/appRoutes";

interface Props {
  setUnhide: React.Dispatch<React.SetStateAction<boolean>>; 
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePBModalContainer = ({setUnhide, setRefresh}: Props) => {
  const navigate = useNavigate();

  const distanceOptions = [
    {value: '100m', label: '100m'},
    {value: '500m', label: '500m'},
    {value: '1000m', label: '1000m'},
    {value: '2000m', label: '2000m'},
    {value: '6000m', label: '6000m'},
    {value: '10000m', label: '10000m'},
  ];

  const [distance, setDistance] = useState<Option>({value: '', label: ''});
  const [newTime, setNewTime] = useState<string>('');


  const handleDistanceSelect = (newValue: Option, actionMeta: any) => {
    setDistance(newValue)
  };

  const resetForm = () => {
    setDistance({value: '', label: ''});
    setNewTime('');
  }

  // handle submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await UpdatePB(distance.label, newTime);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function UpdatePB has undefined value');
    } else {
      const responseData = response?.data;

      if(responseData.success) {
        setUnhide(false);
        resetForm();
        navigate(getRouteByTitle('My Dashboard').path);
        setRefresh(true);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="z-10 bg-gray-400 border-gray-600 border-4 rounded-lg w-1/3 h-2/5 opacity-100 overflow-y-auto">

      <FormDropdown title="Distance" options={distanceOptions} placeholder="Select distance..." name="distance" changeHandler={handleDistanceSelect} paddingTop="pt-5" value={distance} />
      
      {distance.label !== '' && (
        <div>
          <TimeInputField title="New Personal Best" changeHandler={setNewTime} paddingTop="pt-5" />
        </div>
      )}

      <div className="flex mt-10 mx-10 mb-5">
        {distance.label === '' ? <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={true} /> : <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={false} />}

        <button className="w-2/5 text-black bg-white hover:bg-red mx-auto my-auto px-4 py-2 text-lg font-bold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-400" onClick={
          () => {
            setUnhide(false);
            resetForm();
        }}>Cancel</button>
      </div>
    </form>
  )
}

export default UpdatePBModalContainer;