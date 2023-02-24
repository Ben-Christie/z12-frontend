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

}

const FormInputField = ({title, placeholder, type, name, changeHandler, culprit, errorMessage, min, max, paddingTop, paddingBottom}:Props) => {
  // error identification
  const isEmailError = culprit === 'email' && name === 'email';
  const isPasswordError = culprit === 'password' && name === 'password';
  const isFirstNameError = culprit === 'firstName' && name === 'firstname';
  const isLastNameError = culprit === 'lastName' && name === 'lastname';
  const isPhoneNumberError = culprit === 'phoneNumber' && name === 'phonenumber';
  const isHeightError = culprit === 'height' && name === 'height';
  const isWeightError = culprit === 'weight' && name === 'weight';
  const isWingspanError = culprit === 'wingspan' && name === 'wingspan';

  const errorExists = isEmailError || isPasswordError || isFirstNameError || isLastNameError || isPhoneNumberError || isHeightError || isWeightError || isWingspanError;

  const culpritExists = culprit !== undefined || culprit !== '';

  return(
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom)}>
    <div className="flex">
      <label className="text-lg font-bold mb-2 text-orange-400 pr-3">{title}</label>
      {errorExists && <p className="mb-2 text-red-700 font-bold">*{errorMessage}*</p>}
    </div>
    
    <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event.currentTarget.value)} min={min} max={max} type={type} name={name} placeholder={placeholder} className={classNames(
      'p-2', 
      'rounded-lg', 
      'text-lg',
      'font-bold',
      'focus:outline-none', 
      'focus:border-orange-500',
      'border-2',
      {'focus:border-red-700' : culpritExists && errorExists},
    )} />
  </div>
  )
}

export default FormInputField;
        