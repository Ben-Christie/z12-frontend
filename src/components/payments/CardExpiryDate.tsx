import classNames from "classnames";
import { useState } from "react";
import { generateYears, generatePaddedValues } from "../formFields/DateOfBirthDropdown";

interface Props {
  title: string;
  changeHandler: React.Dispatch<React.SetStateAction<string>>;
  paddingTop?: string;
  paddingBottom?: string;
  errorMessage?: string;
  culprit?: string;
}

const currentYear = new Date().getFullYear();

const months = generatePaddedValues(1, 12);
const years = generateYears(currentYear, (currentYear + 10), false);

const CardExpiryDate = ({title, changeHandler, paddingTop, paddingBottom}: Props) => {
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState(currentYear.toString());

  const selectedDate = `${month}/${year}`;

  changeHandler(selectedDate);

  return (
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom, 'font-bold')}>
      <label className="text-lg font-bold mb-2 text-orange-400">{title}</label>
      <div className="grid grid-cols-2">

        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setMonth(event.target.value)} className="p-3 rounded-lg text-lg focus:outline-none focus:outline-orange-500 mr-3 text-center">
          {months.map(month => <option key={month} value={month}>{month}</option>)}
        </select>

        <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(event.target.value)} className="p-2.5 rounded-lg text-lg focus:outline-none focus:outline-orange-500 text-center">
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    </div>
  )
}

export default CardExpiryDate;