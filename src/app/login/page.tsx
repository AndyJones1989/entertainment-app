'use client'
import axios from "axios";
import { useContext, useState } from "react";
import classes from './page.module.css';
import Header from "../components/header/header";
import TitleBanner from "../components/title-banner/title-banner";
import { AuthContext } from "../context/auth-provider";
import { useRouter } from "next/navigation";


export default function Login() {
  const {authDetails} = useContext(AuthContext);
  const {setAuthenticated} = authDetails;
  const router = useRouter();

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
  console.log(response.data);
  setAuthenticated({
    isAuthenticated: true,
    userName: emailInput,
    token: response.data,
    setAuthenticated: setAuthenticated
  })

  if(globalThis.window){
    window.localStorage.setItem('token', response.data);
    window.localStorage.setItem('user', emailInput);
    console.log(window.localStorage.getItem('token'));
    console.log(window.localStorage.getItem('user'))
    }
 
Promise.allSettled([response]).then(()=>{ router.push('/landing');})

  }
  catch{
    setShowErrorDialogue(true);
  }
}
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
    <input type='email' id='email' onChange={handleEmailChange} className={`${classes.formField} ${addInvalidEmailClass}`}></input>
    <label htmlFor='password' className={classes.inputLabel}>Password</label>
    <input type='password' id='password' onChange={handlePasswordChange} className={`${classes.formField} ${addInvalidPasswordClass}`}></input>
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