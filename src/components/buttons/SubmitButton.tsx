import classNames from "classnames";

interface Props {
  title: string;
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  buttonWidth?: string;
  disabled?: boolean;
}

const SubmitButton = ({title, textColor = 'text-white', bgColor = 'bg-black', hoverBgColor = 'hover:bg-orange-400', buttonWidth = 'w-1/4', disabled}:Props) => {
  return (
    <input type="submit" value={title} className={
      classNames(
        'mx-auto', 
        'my-auto', 
        `${buttonWidth}`, 
        'px-4', 
        'py-2', 
        'text-lg', 
        'font-bold', 
        'rounded-lg', 
        {'transition-all' : !disabled}, 
        {'duration-200' : !disabled}, 
        {'ease-in-out' : !disabled}, 
        {'transform' : !disabled}, 
        {'hover:scale-110' : !disabled}, 
        'cursor-pointer',
        `${bgColor}`, 
        `${textColor}`, 
        `${hoverBgColor}`,
        {'hover:cursor-not-allowed' : disabled},
        {'bg-gray-600' : disabled},
        {'hover:bg-gray-600' : disabled} 
      )
  } />
  )
}

export default SubmitButton;