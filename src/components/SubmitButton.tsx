import classNames from "classnames";

interface Props {
  title: string;
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
}

const SubmitButton = ({title, textColor = 'text-white', bgColor = 'bg-black', hoverBgColor = 'hover:bg-orange-400'}:Props) => {
  return (
    <input type="submit" value={title} className={
      classNames(
        'mx-auto', 
        'my-auto', 
        'w-1/4', 
        'px-4', 
        'py-2', 
        'text-lg', 
        'font-bold', 
        'rounded-lg', 
        'transition-all', 
        'duration-200', 
        'ease-in-out', 
        'transform', 
        'hover:scale-110', 
        `${bgColor}`, 
        `${textColor}`, 
        `${hoverBgColor}`
      )
  } />
  )
}

export default SubmitButton;