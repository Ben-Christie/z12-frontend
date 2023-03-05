import { useNavigate } from "react-router-dom";
// imported to allow us to apply conditional styling to the component depending on the state
import classNames from "classnames";

interface Props {
  path: string;
  isLogin: boolean;
}

const LoginRegisterButtons = ({path, isLogin}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="h-1/5 w-full grid grid-cols-2">
    <button onClick={() => navigate(path)} disabled={isLogin} className={
      classNames(
        'bg-z12-gray', 
        {'opacity-80' : isLogin},
        {'opacity-40' : !isLogin}, 
        {'hover:opacity-50' : !isLogin},
        'rounded-tl-xl', 
        'font-extrabold', 
        'text-3xl', 
        {'text-white' : isLogin},
        {'text-black' : !isLogin},
        {'hover:text-white' : !isLogin},
        'tracking-wide'
      )
    }>Login</button>

    <button onClick={() => navigate(path)} disabled={!isLogin} className={
      classNames(
        'bg-z12-gray', 
        {'opacity-80' : !isLogin},
        {'opacity-40' : isLogin}, 
        {'hover:opacity-50' : isLogin},
        'rounded-tr-xl', 
        'font-bold', 
        'text-3xl', 
        {'text-white' : !isLogin},
        {'text-black' : isLogin},
        {'hover:text-white' : isLogin},
        'tracking-wide'
      )
    }>Register</button>
  </div>
  )
}

export default LoginRegisterButtons;