import classNames from "classnames";
import { useState, useEffect } from "react";

interface Props {
  title: string;
  changeHandler: React.Dispatch<React.SetStateAction<string>>;
  paddingTop?: string;
  paddingBottom?: string;
  initialValue?: string;
}

export const generatePaddedValues = (min: number, max: number) => {
  const values = [];

  for(let i = min; i <= max; i++) {
    const formattedValue = i.toString().padStart(2, '0');
    values.push(formattedValue);
  }

  return values;
}

export const generateYears = (present: number, past: number, rewind:boolean) => {
  const years = [];

  if(rewind) {
    for(let i = present; i >= past; i--) {
      years.push(i.toString());
    }
  } else {
    for(let i = present; i <= past; i++) {
      years.push(i.toString());
    }
  }

  return years;
}

const currentYear = new Date().getFullYear();

const days = generatePaddedValues(1, 31);
const months = generatePaddedValues(1, 12);
const years = generateYears(currentYear, (currentYear - 100), true);

const DateOfBirthDropdown = ({title, changeHandler, paddingTop, paddingBottom, initialValue}: Props) => {
  const [day, setDay] = useState<string>('01');
  const [month, setMonth] = useState<string>('01');
  const [year, setYear] = useState<string>(currentYear.toString());
  const [selectedDate, setSelectedDate] = useState<string>(`${day}/${month}/${year}`);

  const parseInitialDate = () => {
    if(initialValue) {
      const initDate = initialValue.split('-');
      setDay(initDate[2]);
      setMonth(initDate[1]);
      setYear(initDate[0]);
      setSelectedDate(`${initDate[2]}/${initDate[1]}/${initDate[0]}`);
    }
  }

  
  useEffect(() => {
    parseInitialDate();
  }, []);

  useEffect(() => {
    setSelectedDate(`${day}/${month}/${year}`);
  }, [day, month, year]);

  useEffect(() => {
    changeHandler(selectedDate);
  }, [selectedDate]);

  return (
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom, 'font-bold')}>
      <label className="text-lg font-bold mb-2 text-orange-400">{title}</label>
      <div className="grid grid-cols-3">
        
        <select value={day} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setDay(event.target.value)} className="p-2.5 rounded-lg text-lg focus:outline-none focus:outline-orange-400 mr-3 text-center">
          {days.map(day => <option key={day} value={day}>{day}</option>)}
        </select>

        <select value={month} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setMonth(event.target.value)} className="p-3 rounded-lg text-lg focus:outline-none focus:outline-orange-400 mr-3 text-center">
          {months.map(month => <option key={month} value={month}>{month}</option>)}
        </select>

        <select value={year} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(event.target.value)} className="p-2.5 rounded-lg text-lg focus:outline-none focus:outline-orange-400 text-center">
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    </div>
  )
}

export default DateOfBirthDropdown;