'use client'
import axios from "axios";
import { useState } from "react";


export default function Login() {
  console.log(process.env.NEXT_PUBLIC_API_URL + 'login/');

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

const handleSubmit = async (event:any) => {
  event.preventDefault();
  const user = {
    email: emailInput,
    password: passwordInput
  }

  var headers = {
    'Content-Type': 'application/json', 
    "Access-Control-Allow-Origin": "*"
}

  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'login', { user } );
  console.log(response)
};

const handleEmailChange = (event)=>{
  setEmailInput(event.target.value);
};

const handlePasswordChange = (event)=>{
  setPasswordInput(event.target.value);
};

    return (
    <form onSubmit={handleSubmit}>
    <input type='email' onChange={handleEmailChange}></input>
    <input type='password' onChange={handlePasswordChange}></input>
    <button >submit</button>
    </form>
    );
  }