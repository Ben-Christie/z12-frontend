import classNames from "classnames";
import Select, { ActionMeta, SingleValue } from "react-select";
import { selectStyling } from "../../utilities/SelectStyling";
import { Option } from "./FormMultiSelectDropdown";
import { useState } from "react";

interface Props {
  title: string;
  options: Option[];
  changeHandler: (newValue: Option, actionMeta: ActionMeta<Option>) => void;
  paddingTop?: string;
  paddingBottom?: string;
  placeholder?: string;
  errorMessage?: string;
  culprit?: string;
  name: string;
  xPadding?: string;
  marginLR?: string;
  value?: Option;
  initialValue?: string;
}

const FormDropdown = ({title, options, changeHandler, paddingTop, paddingBottom, placeholder, errorMessage, culprit, name, xPadding = 'px-10', marginLR, value, initialValue}: Props) => {

  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const handleChange = (newValue: Option | SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    setSelectedValue(newValue as Option);
    changeHandler(newValue as Option, actionMeta);
  }

  const isRaceCategoryError = culprit === 'race category' && name === 'racecategory';

  const errorExists = isRaceCategoryError;

  let initialSelectedValue = {value: '', label: ''};

  if(initialValue) {
    initialSelectedValue = {value: initialValue.toLowerCase(), label: initialValue}
    if (!selectedValue) {
      setSelectedValue(initialSelectedValue);
    }
  }

  return (
    <div className={classNames('flex', 'flex-col', `${xPadding}`, `${marginLR}`, paddingTop, paddingBottom, 'font-bold')}>
      <div className="flex">
        <label className="text-lg font-bold mb-2 text-orange-400 pr-3">{title}</label>
        {errorExists && <p className="mb-2 text-red-700 font-bold">*{errorMessage}*</p>}
      </div>
      <Select
        onChange={handleChange}
        placeholder={placeholder}
        options={options}
        styles={selectStyling}
        value={selectedValue}
      />
    </div>
  )
}

export default FormDropdown;
