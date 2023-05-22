'use client'
import axios from "axios";
import { useContext, useState } from "react";
import classes from './page.module.css';
import Header from "../components/header/header";
import TitleBanner from "../components/title-banner/title-banner";
import { AuthContext } from "../context/auth-provider";


export default function Login() {
  const {authDetails} = useContext(AuthContext);
  const {setAuthenticated} = authDetails;
  console.log(AuthContext);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showErrorDialogue, setShowErrorDialogue] = useState(false);
  const [inputIsValid, setInputIsValid] = useState({
    email: true,
    password: true
  })

const handleSubmit = async (event:any) => {
  event.preventDefault();

  const user = {
    email: emailInput,
    password: passwordInput
  }
  if(checkIsValid(user)){

  try{
  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'login', { user } );
  console.log(response);
  setAuthenticated({
    isAuthenticated: true,
    userName: 'andy',
    token: response.data,
    setAuthenticated: setAuthenticated

  })
 window.location.href = window.location.href.replace('login', 'landing');
  }
  catch{
    setShowErrorDialogue(true);
  }
}
console.log(authDetails);
};

const checkIsValid = (userObject: IUserObject) => {
  if(userObject.email.includes('@')){
    if(passwordInput){
      return true;
    }
    else {
      setInputIsValid((prevState)=>{
        prevState.password = false;
        return prevState;
      });
    }
  }
  else {
    setInputIsValid((prevState)=>{
    prevState.email = false;
    return prevState;
  });
}
if(!passwordInput){
  setInputIsValid((prevState)=>{
    prevState.password = false;
    return prevState;
  });
}
  console.log('inval');
  setShowErrorDialogue(true);
  return false;
}

const handleEmailChange = (event: IInputChangeEvent) => {
setEmailInput(event.target.value);
setShowErrorDialogue(false);
setInputIsValid((prevState)=>{
  prevState.email = true;
  return prevState;
})
}

const handlePasswordChange = (event: IInputChangeEvent) => {
  setPasswordInput(event.target.value);
  setShowErrorDialogue(false);
  setInputIsValid((prevState)=>{
    prevState.password = true;
    return prevState;
  })
  }

const addInvalidEmailClass = inputIsValid.email ? '' : classes.inputInvalid;
const addInvalidPasswordClass = inputIsValid.password ? '' : classes.inputInvalid;

    return (
      <>
      <Header isLoggedIn={false}/>
      <TitleBanner text='Log-In or Sign Up'/>
    <form onSubmit={handleSubmit} className={classes.formWrapper}>
    {showErrorDialogue &&
    <div className={classes.errorBox}>There was an error in the details you submitted</div>
    }
    <label htmlFor='email' className={classes.inputLabel}>Email</label>
    <input type='email' onChange={handleEmailChange} className={`${classes.formField} ${addInvalidEmailClass}`}></input>
    <label htmlFor='password' className={classes.inputLabel}>Password</label>
    <input type='password' onChange={handlePasswordChange} className={`${classes.formField} ${addInvalidPasswordClass}`}></input>
    <button className={classes.formButton} >Submit</button>
    </form>
    </>
    );
  }

  interface IInputChangeEvent {
    target: {
      value: string;
    }
  }

  interface IUserObject {
      email: string;
      password: string;
  }