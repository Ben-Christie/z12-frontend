import FormDropdown from "../formFields/FormDropdown";
import { useEffect, useState } from "react";
import { Option } from "../formFields/FormMultiSelectDropdown";
import SubmitButton from "../buttons/SubmitButton";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../../utilities/appRoutes";
import DateOfBirthDropdown from "../formFields/DateOfBirthDropdown";
import FormInputField from "../formFields/FormInputField";
import FormMultiSelectDropdown from "../formFields/FormMultiSelectDropdown";
import GetDetailsForModal from "../../utilities/requests/GetDetailsForModal";
import { getRowingClubNames, getRaceCategories, getRowingCoaches } from "../../utilities/requests/GetAthleteDropdownData";
import UpdateUserDetails from "../../utilities/requests/UpdateUserDetails";

interface Props {
  setUnhide: React.Dispatch<React.SetStateAction<boolean>>; 
}

const UpdatePBModalContainer = ({setUnhide}: Props) => {

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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [initGender, setInitGender] = useState<string>('');
  const [initAthleteOrCoach, setInitAthleteOrCoach] = useState<string>('');
  const [initSelectedClubs, setInitSelectedClubs] = useState<string[]>([]);
  const [initSelectedCoaches, setInitSelectedCoaches] = useState<string[]>([]);
  const [initRaceCategory, setInitRaceCategory] = useState<string>('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Option>({value: 'male', label: 'Male'});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [athleteOrCoach, setAthleteOrCoach] = useState<Option>({value: 'athlete', label: 'Athlete'});

  const [selectedClubs, setSelectedClubs] = useState<Option[]>([]);
  const [selectedCoaches, setSelectedCoaches] = useState<Option[]>([]);
  const [raceCategory, setRaceCategory] = useState<Option>({value: '', label: ''});
  const [weight, setWeight] = useState('0');
  const [height, setHeight] = useState('0');
  const [wingspan, setWingspan] = useState('0');

  const [raceCategoryOptions, setRaceCategoryOptions] = useState<Option[]>([]);
  const [clubNameOptions, setClubNameOptions] = useState<Option[]>([]);
  const [coachNameOptions, setCoachNameOptions] = useState<Option[]>([]);
  
  const [culprit, setCulprit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const init = async () => {
    setIsLoading(true);

    const initDetails = await GetDetailsForModal();
    const rowingClubNames = await getRowingClubNames();
    const rowingCoaches = await getRowingCoaches();
    const raceCategories = await getRaceCategories();
    
    try {
      if(!AllValuesDefined(initDetails?.data)) {
        console.error('Error: response from function GetDetailsForModal has undefined value');
      } else {
        const data = initDetails?.data;

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDob(data.dateOfBirth);
        setInitGender(data.gender);
        setPhoneNumber(data.phoneNumber);
        setInitAthleteOrCoach(data.athleteOrCoach);
        setInitSelectedClubs(data.clubs);
        setInitSelectedCoaches(data.coaches);
        setInitRaceCategory(data.raceCategory);
        setWeight(data.weight);
        setHeight(data.height);
        setWingspan(data.wingspan);

        setSelectedClubs(createOptionValues(data.clubs));
        setSelectedCoaches(createOptionValues(data.coaches));
        setRaceCategory({value: data.raceCategory.toLowerCase(), label: data.raceCategory});
      }

      if(rowingClubNames !== undefined) {
        setClubNameOptions(rowingClubNames);
      }

      if(rowingCoaches !== undefined) {
        setCoachNameOptions(rowingCoaches);
      }

      if(raceCategories !== undefined) {
        setRaceCategoryOptions(raceCategories);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setUnhide(false);
    }
  }

  const createOptionValues = (array: string[]) => {
    const selection: Option[] = [];

    array.map((element) => {
      selection.push({value: element.toLowerCase(), label: element})
    });

    return selection;
  }

  // handle submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clubs: string[] = [];
    const coaches: string[] = [];

    selectedClubs.map((club) => (
      clubs.push(club.label)
    ));

    selectedCoaches.map((coach) => (
      coaches.push(coach.label)
    ));

    const response = await UpdateUserDetails(firstName, lastName, dob, gender.label, phoneNumber, athleteOrCoach.label, weight, height, wingspan, raceCategory.label, clubs, coaches);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function UpdatePB has undefined value');
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

  const handleGenderSelect = (newValue: Option, actionMeta: any) => {
    setGender(newValue)
  };

  const handleSelectedClubsChange = (newValue: Option[], actionMeta: any) => {
    setSelectedClubs(newValue);
  };
  
  const handleSelectedCoachesChange = (newValue: Option[], actionMeta: any) => {
    setSelectedCoaches(newValue);
  };
  
  const handleRaceCategorySelect = (newValue: Option, actionMeta: any) => {
    setRaceCategory(newValue)
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="z-10 bg-gray-400 border-gray-600 border-4 rounded-lg w-40% h-2/5 opacity-100 overflow-y-auto">

      {isLoading ? 
        <div className="text-white font-bold flex justify-center pt-5 text-xl">
          Loading...
        </div> : 
        <div>
          <div className="grid grid-cols-2">
            <FormInputField title="First Name" name="firstName" type="text" changeHandler={setFirstName} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" initialValue={firstName} />
            
            <FormInputField title="Last Name" name="lastName" type="text" changeHandler={setLastName} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" initialValue={lastName} />
          </div>

          <DateOfBirthDropdown title="Date of Birth" changeHandler={setDob} paddingTop="pt-5" initialValue={dob} />

          <div className="grid grid-cols-2">
            <FormDropdown title="Gender" options={genderOptions} placeholder="Select gender..." changeHandler={handleGenderSelect} name="gender" paddingTop="pt-5" initialValue={initGender} />

            <FormDropdown title="Athlete or Coach?" options={userTypeOptions} placeholder="Select user type..." changeHandler={setAthleteOrCoach} name="athleteOrCoach" paddingTop="pt-5" initialValue={initAthleteOrCoach} />
          </div>

          <FormInputField title="Phone Number" name="phoneNumber" type="text" changeHandler={setPhoneNumber} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" initialValue={phoneNumber} />

          <FormDropdown title="Race Category" options={raceCategoryOptions} changeHandler={handleRaceCategorySelect} placeholder="Select race category..." errorMessage={errorMessage} culprit={culprit} name="racecategory" paddingTop="pt-5" initialValue={initRaceCategory} />

          <div className="grid grid-cols-3">
            <FormInputField title="Height (cm)" name="height" type="text" changeHandler={setHeight} culprit={culprit} errorMessage={errorMessage} min={0} paddingTop="pt-5" initialValue={height} />

            <FormInputField title="Weight (kg)" name="weight" type="text" changeHandler={setWeight} culprit={culprit} errorMessage={errorMessage} min={0} paddingTop="pt-5" initialValue={weight} />

            <FormInputField title="Wingspan (cm)" name="wingspan" type="text" changeHandler={setWingspan} culprit={culprit} errorMessage={errorMessage} min={0} paddingTop="pt-5" initialValue={wingspan} />
          </div>

          <FormMultiSelectDropdown title="Clubs" options={clubNameOptions} changeHandler={handleSelectedClubsChange} placeholder="Select clubs..." paddingTop="pt-2" initialValues={initSelectedClubs} />

          <FormMultiSelectDropdown title="Coaches" options={coachNameOptions} changeHandler={handleSelectedCoachesChange} placeholder="Select coaches..." paddingTop="pt-2" initialValues={initSelectedCoaches} />

          <div className="flex mt-10 mx-10 mb-5">
            <SubmitButton title="Submit" buttonWidth="w-2/5" />

            <button className="w-2/5 text-black bg-white hover:bg-red mx-auto my-auto px-4 py-2 text-lg font-bold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-red-400" onClick={
              () => {
                setUnhide(false);
            }}>Cancel</button>
          </div>
        </div>
      }
    </form>
  )
}

export default UpdatePBModalContainer;