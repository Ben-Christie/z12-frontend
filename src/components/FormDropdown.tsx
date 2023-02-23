import classNames from "classnames";
import Select, { ActionMeta, SingleValue } from "react-select";
import { selectStyling } from "../utilities/SelectStyling";
import { Option } from "./FormMultiselectDropdown";
interface Props {
  title: string;
  options: Option[];
  changeHandler: (newValue: Option, actionMeta: ActionMeta<Option>) => void;
  paddingTop?: string;
  paddingBottom?: string;
  placeholder: string;
}

const FormDropdown = ({title, options, changeHandler, paddingTop, paddingBottom, placeholder}: Props) => {



  const handleChange = (newValue: Option | SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    changeHandler(newValue as Option, actionMeta);
  }

  return (
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom, 'font-bold')}>
      <label className="text-lg font-bold mb-2 text-orange-400">{title}</label>
      <Select
        onChange={handleChange}
        placeholder = {placeholder}
        options={options}
        styles={selectStyling}
      />
    </div>
  )
}

export default FormDropdown;