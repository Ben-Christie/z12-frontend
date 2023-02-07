import classNames from "classnames";

interface Props {
  title: string;
  placeholder?: string;
  type: string;
  name: string;
  changeHandler: React.Dispatch<React.SetStateAction<string>>;
  containsError?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
  paddingTop?: string;
  paddingBottom?: string;

}

const FormInputField = ({title, placeholder, type, name, changeHandler, containsError, errorMessage, min, max, paddingTop, paddingBottom}:Props) => {
  const isEmailError = (containsError && errorMessage?.toLowerCase().includes('email') && type === 'email')
  const isPasswordError = (containsError && errorMessage?.toLowerCase().includes('password') && type === 'password')

  return(
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom)}>
    <label className="text-lg font-bold mb-2">{title}</label>
    {(isEmailError || isPasswordError) && <p className="mb-2 text-red-700 font-bold">*{errorMessage}*</p>}
    
    <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event.currentTarget.value)} min={min} max={max} type={type} name={name} placeholder={placeholder} className={classNames(
      'p-2', 
      'rounded-lg', 
      'text-lg', 
      'focus:outline-none', 
      {'focus:outline-orange-500' : !containsError},
      {'border-2' : containsError},
      {'border-red-700' : containsError && ((type === 'password' && isPasswordError) || (type === 'email' && isEmailError))},
    )} />
  </div>
  )
}

export default FormInputField;
        