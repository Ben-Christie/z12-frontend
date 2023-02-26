import classNames from "classnames";
import { useState } from "react";

interface Props {
  title: string;
  paddingTop?: string;
  paddingBottom?: string;
  changeHandler: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  culprit: string;
}

const TimeInputField = ({title, paddingBottom, paddingTop, changeHandler, errorMessage, culprit}: Props) => {

  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('0');
  const [second, setSecond] = useState('0');
  const [millisecond, setMillisecond] = useState('0')

  const time = `${hour}:${minute}:${second}.${millisecond}`;

  changeHandler(time)

  const createInputField = (placeholder: string, margin: string, changeState: React.Dispatch<React.SetStateAction<string>>) => {
    return(
      <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeState(event.target.value)} className={classNames(
        `${margin}`,
        'p-2', 
        'rounded-lg',
        'text-center',
        'text-lg',
        'focus:outline-none',
        'focus:border-orange-400',
        'border-2'
      )} placeholder={placeholder} />
    )
  }

  const is100Error = culprit === 'pb 100' && title === '100 metres';
  const is500Error = culprit === 'pb 500' && title === '500 metres';
  const is1000Error = culprit === 'pb 1000' && title === '1000 metres';
  const is2000Error = culprit === 'pb 2000' && title === '2000 metres';
  const is6000Error = culprit === 'pb 6000' && title === '6000 metres';
  const is10000Error = culprit === 'pb 10000' && title === '10000 metres';

  const errorExists = is100Error || is500Error || is1000Error || is2000Error || is6000Error || is10000Error;

  return (
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom, 'font-bold')}>
      <div className="flex">
        <label className="text-lg font-bold mb-2 text-orange-400 pr-3">{title}</label>
        {errorExists && <p className="mb-2 text-red-700 font-bold">*{errorMessage}*</p>}
      </div>

      <div className="grid grid-cols-4">
        
        {createInputField('Hour', 'mr-2', setHour)}

        {createInputField('Min', 'mr-2', setMinute)}

        {createInputField('Sec', 'mr-1', setSecond)}

        {createInputField('Milli', 'ml-1', setMillisecond)}

      </div>
    </div>
  )
}

export default TimeInputField;