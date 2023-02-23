import Select, { ActionMeta, MultiValue } from "react-select";
import classNames from "classnames";
import { selectStyling } from "../utilities/SelectStyling";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  paddingTop?: string;
  paddingBottom?: string;
  title: string;
  options: Option[];
  placeholder: string;
  changeHandler: (newValue: Option[], actionMeta: ActionMeta<Option>) => void;
}

const FormMultiselectDropdown = ({paddingTop, paddingBottom, title, options, placeholder, changeHandler}: Props) => {

  const handleChange = (newValue: Option[] | MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    changeHandler(newValue as Option[], actionMeta);
  }

  return(
    <div className={classNames('flex', 'flex-col', 'px-10', paddingTop, paddingBottom, 'font-bold')} >
      <label className="text-lg font-bold mb-2 text-orange-400">{title}</label>
      <Select
        onChange={handleChange}
        placeholder = {placeholder}
        options={options}
        styles={selectStyling}
        isMulti
      />
    </div>
  );
}

export default FormMultiselectDropdown;