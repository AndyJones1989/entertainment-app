"use client"
import { useReducer, useState } from "react";
import axios from "axios";
import Header from "../components/header/header";
import TitleBanner from "../components/title-banner/title-banner";
import classes from './post-event.module.css'
import { IInputChangeEvent } from "../login/page";

export default function PostEvent() {

    //abstract this out.
const authObject = {
    token: window.localStorage.getItem('token')
}

const postAuthData = async () => {

const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'post-event/auth', authObject );
  console.log(response.data);

}

const initialEventObject = {
    name: '',
    description: '',
    town: '',
    contact: ''
}

const eventReducer = (state: IEventObject, action: IEventAction) => {
    switch(action.type){
        case 'name':
            return {...state, name: action.payload}
        case 'description':
            return {...state, description: action.payload}
        case 'town':
            return {...state, town: action.payload}
        case 'contact':
            return {...state, contact: action.payload}
        default:
            return state;
    }

}

const [eventObject, dispatch] = useReducer(eventReducer, initialEventObject);

const [invalidFields, setInvalidFields] = useState({ 
    name: false,
    description: false,
    town: false,
    contact: false
});

const [showErrorDialogue, setShowErrorDialogue] = useState(false);

const handleSubmit = (event: any) => {
    event.preventDefault();
    postAuthData();
    console.log(eventObject);
};

const handleChange = (event: IInputChangeEvent) => {
    dispatch({type: event.target.id, payload: event.target.value});
};

const validate = (event: IInputChangeEvent) => {
const type = event.target.id;

switch(type){
    case 'name':
        if (event.target.value.length < 3){
            invalidFields.name = true;
            return false;
        };
        break;
    case 'description':
        if (event.target.value.length < 10){
            invalidFields.description = true;
            return false;
        };
        break;
    case 'town':
        if (event.target.value.length < 3){
            invalidFields.town = true;
            return false;
        };
        break;
        case 'contact':
            if (!event.target.value.includes('@')){
                invalidFields.contact = true;
                return false;
            };
            break;
            default:
                return true;
        }
    }  

    const handleValidate = (event: IInputChangeEvent) => {
        console.log(invalidFields);
        if (!validate(event)){
            setShowErrorDialogue(true);
        }
        else { setShowErrorDialogue(false);}
    }

    return (

          <>
      <Header isLoggedIn={false}/>
      <TitleBanner text='Create an Event'/>
    <form onSubmit={handleSubmit} className={classes.formWrapper}>
    {showErrorDialogue &&
    <div className={classes.errorBox}>There was an error in the details you submitted</div>
    }
    <label htmlFor='name' className={classes.inputLabel}>Event Name</label>
    <input type='text' id='name' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.name ? 'inputInvalid' : ''}`}></input>
    <label htmlFor='description' className={classes.inputLabel}>Event Description</label>
    <input type='text' id='description' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.description ? 'inputInvalid' : ''}`}></input>
    <label htmlFor='town' className={classes.inputLabel}>Town</label>
    <input type='text' id='town' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.town ? 'inputInvalid' : ''}`}></input>
    <label htmlFor='contact' className={classes.inputLabel}>Contact Email</label>
    <input type='text' id='contact' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.contact ? 'inputInvalid' : ''}`}></input>
    <button className={classes.formButton} >Submit</button>
    </form>
    </>
    )
}


interface IEventObject {
    name: string,
    description: string,
    town: string,
    contact: string
}

interface IEventAction {
    type: string,
    payload: string
}