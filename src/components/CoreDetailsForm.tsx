import { useState } from "react";
import FormDropdown from "./FormDropdown";
import DateOfBirthDropdown from "./DateOfBirthDropdown";
import SubmitButton from "./SubmitButton";
import FormInputField from "./FormInputField";
import AddCoreDetails from "../utilities/requests/AddCoreDetails";
import AllValuesDefined from "../utilities/AllValuesDefined";

const CoreDetailsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [athleteOrCoach, setAthleteOrCoach] = useState('Athlete');
  const [culprit, setCulprit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await AddCoreDetails(firstName, lastName, dateOfBirth, gender, phoneNumber, athleteOrCoach);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function AddCoreDetails has undefined value');
    } else {
      const responseData = response?.data;

      setCulprit(responseData.culprit);
      setErrorMessage(responseData.errorMessage);
    }
  }


  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-3/6 rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">My Details</div>
      <div className="grid grid-cols-2 grid-rows-3 w-full mt-3 overflow-auto">
        
        <FormInputField title="First Name" name="firstname" type="text" changeHandler={setFirstName} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" />

        <FormInputField title="Last Name" name="lastname" type="text" changeHandler={setLastName} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" />

        <DateOfBirthDropdown title="Date of Birth" changeHandler={setDateOfBirth} paddingTop="pt-5" />

        <FormDropdown title="Gender" options={['Male', 'Female']} value={gender} changeHandler={setGender} paddingTop="pt-5" />

        <FormInputField title="Phone Number" name="phonenumber" type="text" changeHandler={setPhoneNumber} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" paddingBottom="pb-5" />

        <FormDropdown title="Athlete or Coach?" options={['Athlete', 'Coach', 'Both']} value={athleteOrCoach} changeHandler={setAthleteOrCoach} paddingTop="pt-5" paddingBottom="pb-5" />
      </div>

      <SubmitButton title="Next" />
    </form>
  )
}

export default CoreDetailsForm;