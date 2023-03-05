import FormInputField from "../formFields/FormInputField";
import FormDropdown from "../formFields/FormDropdown";
import { useState } from "react";
import { Option } from "../formFields/FormMultiSelectDropdown";
import TimeInputField from "../formFields/TimeInputField";
import SubmitButton from "../buttons/SubmitButton";

interface Props {
  setUnhide: React.Dispatch<React.SetStateAction<boolean>>; 
}

const AddSessionModalContainer = ({setUnhide}: Props) => {
  const trainingOptions = [
    {value: 'ergometer', label: 'Ergometer Training'}, 
    {value: 'strengthAndConditioning', label: 'Strength & Conditioning'}
  ];

  const distanceOptions = [
    {value: '100m', label: '100m'},
    {value: '500m', label: '500m'},
    {value: '1000m', label: '1000m'},
    {value: '2000m', label: '2000m'},
    {value: '6000m', label: '6000m'},
    {value: '10000m', label: '10000m'},
  ];

  const exerciseOptions = [
    {value: 'benchPress', label: 'Bench Press'},
    {value: 'bicepCurl', label: 'Bicep Curl'},
    {value: 'deadlift', label: 'Deadlift'},
    {value: 'squat', 'label': 'Squat'}
  ];

  const [trainingCategory, setTrainingCategory] = useState<Option>({value: '', label: ''});
  
  // ergometer metric fields
  const [distance, setDistance] = useState<Option>({value: '', label: ''});
  const [strokePerMinute, setStrokePerMinute] = useState<string>('');
  const [split, setSplit] = useState<string>('');
  const [time, setTime] = useState<string>('');

  // s & c metric fields
  const [exercise, setExercise] = useState<Option>({value: '', label: ''});
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');

  const handleTrainingSelect = (newValue: Option, actionMeta: any) => {
    setTrainingCategory(newValue)
  };

  const handleDistanceSelect = (newValue: Option, actionMeta: any) => {
    setDistance(newValue)
  };

  const handleExerciseSelect = (newValue: Option, actionMeta: any) => {
    setDistance(newValue)
  };

  // handle submit


  return (
    <div className="z-10 bg-gray-400 border-gray-600 border-4 rounded-lg w-1/3 h-2/5 opacity-100 overflow-y-auto">
      <FormDropdown title="Training Category" placeholder="Select training category..." options={trainingOptions} name="trainingcategory" changeHandler={handleTrainingSelect} paddingTop="pt-5" />

      {trainingCategory.label === 'Ergometer Training' && (

        <div>

          <div className="grid grid-cols-2 mx-10 mt-5">

            <FormDropdown title="Distance" options={distanceOptions} name="distance" changeHandler={handleDistanceSelect} xPadding="px-0" marginLR="mr-2.5" />

            <FormInputField title="S/M" type="text" name="strokesPerMinute" changeHandler={setStrokePerMinute} xPadding="px-0" marginLR="ml-2.5" />

          </div>

          <TimeInputField title="500m Split" changeHandler={setSplit} paddingTop="pt-5" />

          <TimeInputField title="Time" changeHandler={setTime} paddingTop="pt-5" />

        </div>

      )}

      {trainingCategory.label === 'Strength & Conditioning' && (

        <div>

          <FormDropdown title="Exercise" options={exerciseOptions} name="exercise" changeHandler={handleExerciseSelect} paddingTop="pt-5" />

          <div className="grid grid-cols-2 mx-10 mt-5">

            <FormInputField title="Weight" type="text" name="weight" changeHandler={setWeight} xPadding="px-0" marginLR="mr-2.5" />

            <FormInputField title="Reps" type="text" name="reps" changeHandler={setReps} xPadding="px-0" marginLR="ml-2.5" />

          </div>

        </div>

      )}

      <div className="flex mt-10 mx-10 mb-5">
        {trainingCategory.label === '' ? <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={true} /> : <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={false} />}

        <button className="w-2/5 text-black bg-white hover:bg-red mx-auto my-auto px-4 py-2 text-lg font-bold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-400" onClick={() => setUnhide(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default AddSessionModalContainer;