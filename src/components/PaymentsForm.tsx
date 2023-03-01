import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../utilities/app-routes";
import SubmitButton from "./SubmitButton";
import FormInputField from "./FormInputField";
import AllValuesDefined from "../utilities/AllValuesDefined";
import CardExpiryDate from "./CardExpiryDate";
import Payments from "../utilities/requests/Payments";


const PaymentsForm = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const fee = '10.00'

  const [errorMessage, setErrorMessage] = useState('');
  const [culprit, setCulprit] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(cardHolderName, cardNumber, expiryDate, cvv, fee)
    const response = await Payments(cardHolderName, cardNumber, expiryDate, cvv, fee)

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from component PaymentsForm has undefined value');
    } else {
      const data = response?.data;
      setErrorMessage(data.errorMessage);
      setCulprit(data.culprit);

      console.log(response?.data)

      if(response?.data.errorMessage === '' && response?.data.culprit === '') {
        navigate(getRouteByTitle('My Dashboard').path);
      } else {
        console.error('Unable to navigate from component: PaymentsForm');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 flex-col h-4/5 w-45% rounded-xl bg-z12-gray opacity-70">
      <div className="text-3xl font-bold mt-6 tracking-wide text-white">Payments</div>

      <div className=" w-3/4 p-3 mt-5 rounded-lg text-lg font-bold focus:outline-none border-orange-500 border-2 bg-black text-white grid grid-cols-2 content-center">
        <p>Membership Fee:</p>
        <p className="flex justify-end">€10.00</p>

      </div>
      
      <div className="grid grid-cols-2 grid-rows-4 w-full mt-8 px-10 overflow-auto">
        
        <div className="col-span-2">
          <FormInputField title="Cardholder's Name" name="cardholder" type="text" changeHandler={setCardHolderName} errorMessage={errorMessage} culprit={culprit} />
        </div>

        <div className="col-span-2">
          <FormInputField title="Card Number" name="cardnumber" type="text" changeHandler={setCardNumber} paddingTop="pt-5" errorMessage={errorMessage} culprit={culprit} />
        </div>

        <CardExpiryDate title="Expiry Date" changeHandler={setExpiryDate} paddingTop="pt-10" errorMessage={errorMessage} culprit={culprit} />

        <FormInputField title="CVV/CVC" name="cvv" type="text" changeHandler={setCvv} paddingTop="pt-10" errorMessage={errorMessage} culprit={culprit} />

      </div>

      <div className="flex w-35% mb-11">
        <SubmitButton title="Complete Payment" buttonWidth="w-2/5" />
      </div>
    </form>
  )
}

export default PaymentsForm;