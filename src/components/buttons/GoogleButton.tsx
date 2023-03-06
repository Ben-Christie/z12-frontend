import classNames from "classnames";
import { FcGoogle } from "react-icons/fc"

const GoogleButton = () => {
  return (
    <button className={classNames('mx-auto', 'my-auto', 'px-4', 'py-2', 'text-lg', 'font-bold', 'rounded-lg', 'cursor-pointer', 'bg-white', 'w-2/5', 'transform', 'transition-all', 'ease-in-out', 'duration-200', 'hover:scale-110')}>
      <div className="flex justify-center items-center">
        <FcGoogle />
        oogle
      </div>
    </button>
  )
}

export default GoogleButton;