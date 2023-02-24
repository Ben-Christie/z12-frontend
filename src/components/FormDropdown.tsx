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
  errorMessage?: string;
  culprit?: string;
  name: string;
}

const FormDropdown = ({title, options, changeHandler, paddingTop, paddingBottom, placeholder, errorMessage, culprit, name}: Props) => {

  const handleChange = (newValue: Option | SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    changeHandler(newValue as Option, actionMeta);
  }

  const isRaceCategoryError = culprit === 'race category' && name === 'racecategory';

  const errorExists = isRaceCategoryError;

  return (
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom, 'font-bold')}>
      <div className="flex">
        <label className="text-lg font-bold mb-2 text-orange-400 pr-3">{title}</label>
        {errorExists && <p className="mb-2 text-red-700 font-bold">*{errorMessage}*</p>}
      </div>
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