"use client"
import { useState } from "react";
import axios from "axios";
import Header from "../components/header/header";
import TitleBanner from "../components/title-banner/title-banner";
import classes from './post-event.module.css'

export default function PostEvent() {

const authObject = {
    username: window.localStorage.getItem('user'),
    token: window.localStorage.getItem('token')
}

const postAuthData = async () => {

const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'post-event', authObject );
  console.log(response.data);

}

const [emailInput, setEmailInput] = useState('');
const [passwordInput, setPasswordInput] = useState('');
const [showErrorDialogue, setShowErrorDialogue] = useState(false);

const handleSubmit = () => {};
const handleNameChange = () => {};
const handleDescriptionChange = () => {};

const invalidFields = {
    name: false,
    description: false,
    postCode: false,
}

    return (

          <>
      <Header isLoggedIn={false}/>
      <TitleBanner text='Create an Event'/>
    <form onSubmit={handleSubmit} className={classes.formWrapper}>
    {showErrorDialogue &&
    <div className={classes.errorBox}>There was an error in the details you submitted</div>
    }
    <label htmlFor='email' className={classes.inputLabel}>Event Name</label>
    <input type='text' id='name' onChange={handleNameChange} className={`${classes.formField} ${invalidFields.name ? 'inputInvalid' : ''}`}></input>
    <label htmlFor='password' className={classes.inputLabel}>Event Description</label>
    <input type='text' id='description' onChange={handleDescriptionChange} className={`${classes.formField} ${invalidFields.description ? 'inputInvalid' : ''}`}></input>
    <button className={classes.formButton} >Submit</button>
    </form>
    </>
    )
}