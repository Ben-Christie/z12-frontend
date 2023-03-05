import classNames from "classnames";

interface Props {
  title: string;
  placeholder?: string;
  type: string;
  name: string;
  changeHandler: React.Dispatch<React.SetStateAction<string>>;
  culprit?: string;
  errorMessage?: string;
  min?: number;
  max?: number;
  paddingTop?: string;
  paddingBottom?: string;
  xPadding?: string;
  marginLR?: string;
  zScore?: string;
}

const FormInputField = ({title, placeholder, type, name, changeHandler, culprit, errorMessage, min, max, paddingTop, paddingBottom, xPadding = 'px-10', marginLR, zScore}:Props) => {
  // error identification
  const isEmailError = culprit === 'email' && name === 'email';
  const isPasswordError = culprit === 'password' && name === 'password';

  const isFirstNameError = culprit === 'firstName' && name === 'firstName';
  const isLastNameError = culprit === 'lastName' && name === 'lastName';
  const isPhoneNumberError = culprit === 'phoneNumber' && name === 'phoneNumber';
  const isHeightError = culprit === 'height' && name === 'height';
  const isWeightError = culprit === 'weight' && name === 'weight';
  const isWingspanError = culprit === 'wingspan' && name === 'wingspan';

  const isCardHolderError = culprit === 'full name' && name === 'cardholder'
  const isCardNumberError = culprit === 'card number' && name === 'cardNumber'
  const isCvvError = culprit === 'cvv' && name === 'cvv'

  const errorExists = isEmailError || isPasswordError || isFirstNameError || isLastNameError || isPhoneNumberError || isHeightError || isWeightError || isWingspanError || isCardHolderError || isCardNumberError || isCvvError;

  const culpritExists = culprit !== undefined || culprit !== '';

  return(
    <div className={classNames('flex', 'flex-col', `${xPadding}`, paddingTop, paddingBottom, `${marginLR}`)}>
      <div className="flex">
        <label className="text-lg font-bold mb-2 text-orange-400 pr-3">{title}</label>
        {errorExists && <p className="mb-2 text-red-700 font-bold">*{errorMessage}*</p>}
      </div>
      
      <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event.currentTarget.value)} min={min} max={max} type={type} name={name} placeholder={placeholder} className={classNames(
        'p-2', 
        `${zScore}`,
        'rounded-lg', 
        'text-lg',
        'font-bold',
        'focus:outline-none', 
        'focus:border-orange-400',
        'border-2',
        {'focus:border-red-700' : culpritExists && errorExists},
      )} />
    </div>
  )
}

export default FormInputField;
        