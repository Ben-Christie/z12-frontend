import { useState } from "react";
import FormDropdown from "./FormDropdown";
import SubmitButton from "./SubmitButton";
import FormInputField from "./FormInputField";
import { updateUserDetails } from "../utilities/requests";

const CoreDetailsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [athleteOrCoach, setAthleteOrCoach] = useState('Athlete');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserDetails('first_name', firstName, 'last_name', lastName, 'date_of_birth', dateOfBirth, 'gender', gender, 'phone_number', phoneNumber, 'athlete_or_coach', athleteOrCoach);
  }


  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-3/6 rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">My Details</div>
      <div className="grid grid-cols-2 grid-rows-3 w-full mt-3 overflow-auto">
        <FormInputField title="First Name" name="firstname" type="text" changeHandler={setFirstName} paddingTop="pt-5" />

        <FormInputField title="Surname" name="surname" type="text" changeHandler={setLastName} paddingTop="pt-5" />

        <FormInputField title="Date of Birth" name="dob" type="text" placeholder="DD/MM/YYYY" changeHandler={setDateOfBirth} paddingTop="pt-5" />

        <FormDropdown title="Gender" options={['Male', 'Female']} value={gender} changeHandler={setGender} paddingTop="pt-5" />

        <FormInputField title="Phone Number" name="phonenumber" type="text" changeHandler={setPhoneNumber} paddingTop="pt-5" paddingBottom="pb-5" />

        <FormDropdown title="Athlete or Coach?" options={['Athlete', 'Coach', 'Both']} value={athleteOrCoach} changeHandler={setAthleteOrCoach} paddingTop="pt-5" paddingBottom="pb-5" />
      </div>

      <SubmitButton title="Next" />
    </form>
  )
}

export default CoreDetailsForm;