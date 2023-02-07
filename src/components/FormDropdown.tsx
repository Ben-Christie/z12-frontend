import classNames from "classnames";

interface Props {
  title: string;
  options: string[];
  value: string;
  changeHandler: React.Dispatch<React.SetStateAction<string>>;
  paddingTop?: string;
  paddingBottom?: string;
}

const FormDropdown = ({title, options, value, changeHandler, paddingTop, paddingBottom}: Props) => {
  return (
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom)}>
    <label className="text-lg font-bold mb-2">{title}</label>
    <select onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeHandler(event.currentTarget.value)} value={value} className="p-2.5 rounded-lg text-lg focus:outline-none focus:outline-orange-500">
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
    </div>
  )
}

export default FormDropdown;