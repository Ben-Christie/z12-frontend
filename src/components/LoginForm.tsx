import LoginRegisterButtons from "./LoginRegisterButtons";
import FormInputField from "./FormInputField";
import SubmitButton from "./SubmitButton";
import ForgotPassword from "./ForgotPassword";
import { getRouteByTitle } from "../utilities/app-routes";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateUserLogin from "../utilities/requests/CreateUserLogin";
import VerifyUserLogin from "../utilities/requests/VerifyUserLogin";
import React, { useState } from "react";
import AllValuesDefined from "../utilities/AllValuesDefined";

const LoginForm = () => {
  const location = useLocation();
  
  // isLogin true if route = /login, otherwise, false
  const isLogin = (location.pathname === '/login') ? true : false;
  const page = (isLogin) ? getRouteByTitle('Register') : getRouteByTitle('Login');

  // initialise state with empty strings, updated when user enters into input field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [culprit, setCulprit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate()

  // async as we're waiting for the response from the server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if route doesn't = login i.e. = register 
    if(!isLogin) {
      // call function to pass to database
      const response = await CreateUserLogin(email, password, confirmPassword);

      // handle undefined state, ? allow safe execution if value is undefined or null
      if(!AllValuesDefined(response?.data)) {
        console.error('Error: response from function CreateUserLogin has an undefined value');
      } else {
        const res = response?.data;

        const emailIsValid = res.emailIsValid;
        const passwordIsValid = res.passwordIsValid;
        const errorMessage = res.errorMessage;

        if(emailIsValid && passwordIsValid) {
          // navigate to /user-details route
          navigate(getRouteByTitle('User Details').path)
        } else if(!emailIsValid) {
          setCulprit('email');
          setErrorMessage(errorMessage);
        } else if(!passwordIsValid) {
          setCulprit('password');
          setErrorMessage(errorMessage);
        }
      }
    } else {
      const response = await VerifyUserLogin(email, password);

      if(!AllValuesDefined(response?.data)) {
        console.error('Error: response from function VerifyUserLogin has an undefined value');
      } else {
        const res = response?.data;

        const userExists = res.userExists;
        const passwordIsCorrect = res.passwordIsCorrect;
        const errorMessage = res.errorMessage;

        if(userExists && passwordIsCorrect) {
          // navigate to /my-dashboard route
          navigate(getRouteByTitle('My Dashboard').path)
        } else if(!userExists) {
          setCulprit('email');
          setErrorMessage(errorMessage);
        } else if(!passwordIsCorrect) {
          setCulprit('password');
          setErrorMessage(errorMessage);
        } 
      }
    }
  }

  return(
    <div className="flex justify-center items-center p-2 flex-col h-4/5 w-2/5 rounded-xl">
      <LoginRegisterButtons path={page.path} isLogin={isLogin} />

      <form onSubmit={handleSubmit} className="bg-z12-gray w-full h-5/6 opacity-80 pb-5 px-10 rounded-b-xl flex flex-col justify-center">

        <FormInputField changeHandler={setEmail} type="email" name="email" title="Email Address" culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" />

        <FormInputField changeHandler={setPassword} type="password" name="password" title="Password" culprit={culprit} errorMessage={errorMessage} paddingTop="pt-5" />

        {location.pathname === '/register' && <FormInputField changeHandler={setConfirmPassword} type='password' name='confirm-password' title='Confirm Password' paddingTop="pt-5" />}

        {location.pathname === '/login' && <ForgotPassword />}

        <SubmitButton title={isLogin ? "Login" : "Register"} textColor="text-white" bgColor="bg-black" hoverBgColor="hover:bg-orange-400" />
      </form>
    </div>
  )
}

export default LoginForm;