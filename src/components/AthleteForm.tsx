import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../utilities/app-routes";
import FormDropdown from "./FormDropdown";
import SubmitButton from "./SubmitButton";
import FormInputField from "./FormInputField";
import AllValuesDefined from "../utilities/AllValuesDefined";
import FormMultiselectDropdown from "./FormMultiselectDropdown";
import { Option } from "./FormMultiselectDropdown";
import AddAthleteDetails from "../utilities/requests/AddAthleteDetails";
import { getRowingClubNames, getRaceCategories, getRowingCoaches } from "../utilities/requests/GetAthleteDropdownData";

const AthleteForm = () => {
  const [selectedClubs, setSelectedClubs] = useState<Option[]>([]);
  const [selectedCoaches, setSelectedCoaches] = useState<Option[]>([]);
  const [raceCategory, setRaceCategory] = useState<Option>({value: '', label: ''});
  const [weight, setWeight] = useState('0');
  const [height, setHeight] = useState('0');
  const [wingspan, setWingspan] = useState('0');
  const [culprit, setCulprit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [raceCategoryOptions, setRaceCategoryOptions] = useState<Option[]>([]);
  const [clubNameOptions, setClubNameOptions] = useState<Option[]>([]);
  const [coachNameOptions, setCoachNameOptions] = useState<Option[]>([]);

  // get dropdown data for club, coaches and race categories
  useEffect(() => {
    const fetchData = async () => {
      // race categories
      const categories = await getRaceCategories();
      
      if(categories !== undefined) {
        setRaceCategoryOptions(categories);
      }

      // club names
      const clubNames = await getRowingClubNames();

      if(clubNames !== undefined) {
        setClubNameOptions(clubNames);
      }

      // coach names
      const coachNames = await getRowingCoaches();

      if(coachNames !== undefined) {
        setCoachNameOptions(coachNames);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSelectedClubsChange = (newValue: Option[], actionMeta: any) => {
    setSelectedClubs(newValue);
  };
  
  const handleSelectedCoachesChange = (newValue: Option[], actionMeta: any) => {
    setSelectedCoaches(newValue);
  };
  
  const handleRaceCategorySelect = (newValue: Option, actionMeta: any) => {
    setRaceCategory(newValue)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get labels from Options arrays
    const clubs: string[] = [];
    const coaches: string[] = [];

    selectedClubs.forEach((club: Option) => {
      clubs.push(club.label);
    });

    selectedCoaches.forEach((coach: Option) => {
      coaches.push(coach.label);
    });

    const response = await AddAthleteDetails(raceCategory.label, clubs, coaches, height, weight, wingspan);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function AddCoreDetails has undefined value');
    } else {
      const responseData = response?.data;

      setErrorMessage(responseData.errorMessage);
      setCulprit(responseData.culprit);

      console.log(responseData.errorMessage);

      if(responseData.errorMessage === '' && responseData.culprit === '') {
        navigate(getRouteByTitle('Personal Bests').path);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-3/6 rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">Athlete Details</div>
      <div className="grid grid-cols-2 grid-rows-3 w-full mt-3 overflow-auto">
        
        <FormDropdown title="Race Category" options={raceCategoryOptions} changeHandler={handleRaceCategorySelect} placeholder="Select race category..." paddingTop="pt-5" errorMessage={errorMessage} culprit={culprit} name="racecategory" />

        <FormInputField title="Height (cm)" name="height" type="text" changeHandler={setHeight} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" min={0} />

        <FormMultiselectDropdown title="Clubs" options={clubNameOptions} changeHandler={handleSelectedClubsChange} placeholder="Select clubs..." paddingTop="pt-5"/>

        <FormInputField title="Weight (kg)" name="weight" type="text" changeHandler={setWeight} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" min={0} />

        <FormMultiselectDropdown title="Coaches" options={coachNameOptions} changeHandler={handleSelectedCoachesChange} placeholder="Select coaches..." paddingTop="pt-5"/>

        <FormInputField title="Wingspan (cm)" name="wingspan" type="text" changeHandler={setWingspan} culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" paddingBottom="pb-5" min={0} />
      </div>

      <SubmitButton title="Next" />
    </form>
  )
}

export default AthleteForm;