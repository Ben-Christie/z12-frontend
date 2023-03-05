import FormInputField from "../formFields/FormInputField";
import FormDropdown from "../formFields/FormDropdown";
import { useState } from "react";
import { Option } from "../formFields/FormMultiSelectDropdown";
import TimeInputField from "../formFields/TimeInputField";
import SubmitButton from "../buttons/SubmitButton";

interface Props {
  setUnhide: React.Dispatch<React.SetStateAction<boolean>>; 
}

const UpdatePBModalContainer = ({setUnhide}: Props) => {
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

  // handle submit

  return (
    <div className="z-10 bg-gray-400 border-gray-600 border-4 rounded-lg w-1/3 h-2/5 opacity-100 overflow-y-auto">

      <FormDropdown title="Distance" options={distanceOptions} placeholder="Select distance..." name="distance" changeHandler={handleDistanceSelect} />
      
      {distance.label !== '' && (
        <TimeInputField title="New Personal Best" changeHandler={setNewTime} paddingTop="pt-5" />
      )}

      <div className="flex mt-10 mx-10 mb-5">
        {distance.label === '' ? <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={true} /> : <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={false} />}

        <button className="w-2/5 text-black bg-white hover:bg-red mx-auto my-auto px-4 py-2 text-lg font-bold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-400" onClick={() => setUnhide(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default UpdatePBModalContainer;