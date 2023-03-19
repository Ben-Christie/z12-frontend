import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../../utilities/appRoutes";
import SubmitButton from "../buttons/SubmitButton";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import TimeInputField from "../formFields/TimeInputField";
import NavigatorButton from "../buttons/NavigatorButton";
import AddPersonalBests from "../../utilities/requests/AddPersonalBests";

const PersonalBestsForm = () => {
  const [pb100, setPb100] = useState('')
  const [pb500, setPb500] = useState('');
  const [pb1000, setPb1000] = useState('');
  const [pb2000, setPb2000] = useState('');
  const [pb6000, setPb6000] = useState('');
  const [pb10000, setPb10000] = useState('');
  const [culprit, setCulprit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response: any = await AddPersonalBests(pb100, pb500, pb1000, pb2000, pb6000, pb10000);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function PersonalBests has undefined value');
    } else {
      setCulprit(response?.data.culprit);
      setErrorMessage(response?.data.errorMessage);

      if(errorMessage === '' && culprit === '') {
        navigate(getRouteByTitle('Payments').path);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-65% rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">My Personal Bests</div>
      
      <div className="grid grid-cols-2 grid-rows-3 w-full mt-3 overflow-auto">
        
        <TimeInputField title="100 metres" changeHandler={setPb100} errorMessage={errorMessage} culprit={culprit} />

        <TimeInputField title="2000 metres" changeHandler={setPb2000} errorMessage={errorMessage} culprit={culprit} />

        <TimeInputField paddingTop="pt-5" title="500 metres" changeHandler={setPb500} errorMessage={errorMessage} culprit={culprit} />

        <TimeInputField paddingTop="pt-5" title="6000 metres" changeHandler={setPb6000} errorMessage={errorMessage} culprit={culprit} />

        <TimeInputField paddingTop="pt-5" title="1000 metres" changeHandler={setPb1000} errorMessage={errorMessage} culprit={culprit} />

        <TimeInputField paddingTop="pt-5" title="10000 metres" changeHandler={setPb10000} errorMessage={errorMessage} culprit={culprit} />
      
      </div>

      <div className="flex mt-10 w-35%">
        <SubmitButton title="Submit" buttonWidth="w-2/5" />
        <NavigatorButton title="Skip" buttonWidth="w-2/5" textColor="text-black" bgColor="bg-white" hoverBgColor="hover:bg-orange-400" navigateTo="Payments" />
      </div>

    </form>
  )
}

export default PersonalBestsForm;