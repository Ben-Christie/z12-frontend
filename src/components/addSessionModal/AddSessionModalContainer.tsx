import FormInputField from "../formFields/FormInputField";
import FormDropdown from "../formFields/FormDropdown";
import { useState } from "react";
import { Option } from "../formFields/FormMultiSelectDropdown";
import TimeInputField from "../formFields/TimeInputField";
import SubmitButton from "../buttons/SubmitButton";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../../utilities/appRoutes";
import AddErgData from "../../utilities/requests/AddErgData";
import AddSAndCData from "../../utilities/requests/AddSAndCData";
import { trainingOptions, distanceOptions, exerciseOptions } from "../../utilities/sessionModalData"

interface Props {
  setUnhide: React.Dispatch<React.SetStateAction<boolean>>; 
}

const AddSessionModalContainer = ({setUnhide}: Props) => {
  const [trainingCategory, setTrainingCategory] = useState<Option>({value: '', label: ''});

  const handleTrainingSelect = (newValue: Option, actionMeta: any) => {
    setTrainingCategory(newValue)
  };
  
  // ergometer metric fields
  const [distance, setDistance] = useState<Option>({value: '', label: ''});
  const [strokePerMinute, setStrokePerMinute] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const handleDistanceSelect = (newValue: Option, actionMeta: any) => {
    setDistance(newValue)
  };

  // s & c metric fields
  const [exercise, setExercise] = useState<Option>({value: '', label: ''});
  const [weight, setWeight] = useState<string>('');
  const [reps, setReps] = useState<string>('');

  const handleExerciseSelect = (newValue: Option, actionMeta: any) => {
    setExercise(newValue)
  };

  // handle empty form
  let emptyData = false;

  if(trainingCategory.label === 'Ergometer Training') {
    if(distance.label === '' || strokePerMinute === '' || time === '0:0:0.0') {
      emptyData = true;
    }
  } else if(trainingCategory.label === 'Strength & Conditioning') {
    if(exercise.label === '' || reps === '' || weight === '') {
      emptyData = true;
    }
  }
  
  // error handling
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [culprit, setCulprit] = useState<string>('');

  const navigate = useNavigate();

  // handle submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let response;

    if(trainingCategory.label === 'Ergometer Training') {
      response = await AddErgData(distance.label, strokePerMinute, time);
    } else if(trainingCategory.label === 'Strength & Conditioning') {
      response = await AddSAndCData(exercise.label, reps, weight);
    }

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function AddSessionModalContainer has undefined value');
    } else {
      const responseData = response?.data;

      setErrorMessage(responseData.errorMessage);
      setCulprit(responseData.culprit);

      if(responseData.errorMessage === '' && responseData.culprit === '') {
        setUnhide(false);
        navigate(getRouteByTitle('My Dashboard').path);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="z-10 bg-gray-400 border-gray-600 border-4 rounded-lg w-1/3 h-2/5 opacity-100 overflow-y-auto">
      <FormDropdown title="Training Category" placeholder="Select training category..." options={trainingOptions} name="trainingcategory" changeHandler={handleTrainingSelect} paddingTop="pt-5" />

      {trainingCategory.label === 'Ergometer Training' && (

        <div>

          <div className="grid grid-cols-2 mx-10 mt-5">

            <FormDropdown title="Distance" options={distanceOptions} name="distance" changeHandler={handleDistanceSelect} xPadding="px-0" marginLR="mr-2.5" errorMessage={errorMessage} culprit={culprit} />

            <FormInputField title="S/M" type="text" name="strokesPerMinute" changeHandler={setStrokePerMinute} xPadding="px-0" marginLR="ml-2.5" errorMessage={errorMessage} culprit={culprit} />

          </div>

          <TimeInputField title="Time" changeHandler={setTime} paddingTop="pt-5" errorMessage={errorMessage} culprit={culprit} />

        </div>

      )}

      {trainingCategory.label === 'Strength & Conditioning' && (

        <div>

          <FormDropdown title="Exercise" options={exerciseOptions} name="exercise" changeHandler={handleExerciseSelect} paddingTop="pt-5" errorMessage={errorMessage} culprit={culprit} />

          <div className="grid grid-cols-2 mx-10 mt-5">

            <FormInputField title="Weight" type="text" name="weight" changeHandler={setWeight} xPadding="px-0" marginLR="mr-2.5" errorMessage={errorMessage} culprit={culprit} />

            <FormInputField title="Reps" type="text" name="reps" changeHandler={setReps} xPadding="px-0" marginLR="ml-2.5" errorMessage={errorMessage} culprit={culprit} />

          </div>

        </div>

      )}

      <div className="flex mt-10 mx-10 mb-5">
        {(trainingCategory.label === '' || emptyData === true) ? <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={true} /> : <SubmitButton title="Submit" buttonWidth="w-2/5" disabled={false} />}

        <button className="w-2/5 text-black bg-white hover:bg-red mx-auto my-auto px-4 py-2 text-lg font-bold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-400" onClick={() => setUnhide(false)}>Cancel</button>
      </div>
    </form>
  )
}

export default AddSessionModalContainer;