import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../utilities/app-routes";
import FormDropdown from "./FormDropdown";
import DateOfBirthDropdown from "./DateOfBirthDropdown";
import SubmitButton from "./SubmitButton";
import FormInputField from "./FormInputField";
import AddCoreDetails from "../utilities/requests/AddCoreDetails";
import AllValuesDefined from "../utilities/AllValuesDefined";
import { Option } from "./FormMultiselectDropdown";

const CoreDetailsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Option>({value: 'male', label: 'Male'});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [athleteOrCoach, setAthleteOrCoach] = useState<Option>({value: 'athlete', label: 'Athlete'});
  const [culprit, setCulprit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // data for dropdowns
  const genderOptions: Option[] = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'}
  ];

  const userTypeOptions: Option[] = [
    {value: 'athlete', label: 'Athlete'},
    {value: 'coach', label: 'Coach'},
    {value: 'both', label: 'Both'}
  ];

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await AddCoreDetails(firstName, lastName, dateOfBirth, gender.label, phoneNumber, athleteOrCoach.label);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function AddCoreDetails has undefined value');
    } else {
      const responseData = response?.data;

      const isAthlete = responseData.isAthlete;

      setCulprit(responseData.culprit);
      setErrorMessage(responseData.errorMessage);

      const noError = culprit === '' && errorMessage === '';

      if(noError && isAthlete) {
        // navigate to /athlete-details
        navigate(getRouteByTitle('Athlete Details').path)
      } else if(noError && !isAthlete) {
        // navigate to /payments
        navigate(getRouteByTitle('Payments').path)
      } else {
        console.error('Unable to navigate from component: CoreDetailsForm');
      }
    }
  }

  const handleGenderSelect = (newValue: Option, actionMeta: any) => {
    setGender(newValue)
  };


  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-3/6 rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">My Details</div>
      
      <div className="grid grid-cols-2 grid-rows-3 w-full mt-3 overflow-auto">
        
        <FormInputField title="First Name" name="firstname" type="text" changeHandler={setFirstName} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" />

        <FormInputField title="Last Name" name="lastname" type="text" changeHandler={setLastName} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" />

        <DateOfBirthDropdown title="Date of Birth" changeHandler={setDateOfBirth} paddingTop="pt-5" />

        <FormDropdown title="Gender" options={genderOptions} placeholder="Select gender..." changeHandler={handleGenderSelect} paddingTop="pt-5" name="gender" />

        <FormInputField title="Phone Number" name="phonenumber" type="text" changeHandler={setPhoneNumber} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" paddingBottom="pb-5" />

        <FormDropdown title="Athlete or Coach?" options={userTypeOptions} placeholder="Select user type..." changeHandler={setAthleteOrCoach} paddingTop="pt-5" paddingBottom="pb-5" name="athleteorcoach" />
      </div>

      <SubmitButton title="Submit" />
    </form>
  )
}

export default CoreDetailsForm;