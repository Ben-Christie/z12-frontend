import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { getRouteByTitle } from "../utilities/app-routes";

interface Props {
  title: string;
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  buttonWidth?: string;
  navigateTo: string;
}

const NavigatorButton = ({title, textColor = 'text-white', bgColor = 'bg-black', hoverBgColor = 'hover:bg-orange-400', buttonWidth = 'w-1/4', navigateTo}: Props) => {
  const navigate = useNavigate();
  
  const handleClickEvent = (pageTitle: string) => {
    navigate(getRouteByTitle(pageTitle).path);
  }
  
  return (
    <button type="button" onClick={() => handleClickEvent(navigateTo)} className={classNames(
      "mx-auto",
      "my-auto",
      `${buttonWidth}`,
      "px-4",
      "py-2",
      "text-lg",
      "font-bold",
      "rounded-lg",
      "transition-all",
      "duration-200",
      "ease-in-out",
      "transform",
      "hover:scale-110",
      `${bgColor}`,
      `${textColor}`,
      `${hoverBgColor}`
    )}>
      {title}
    </button>
  );
};

export default NavigatorButton;
