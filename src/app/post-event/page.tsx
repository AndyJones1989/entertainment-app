"use client"
import { useReducer, useState } from "react";
import axios from "axios";
import Header from "../components/header/header";
import TitleBanner from "../components/title-banner/title-banner";
import classes from './post-event.module.css'
import { IInputChangeEvent } from "../login/page";
import { useRouter } from "next/navigation";
import { useIsClient } from "../context/is-client-ctx";

export default function PostEvent() {
    const isClient = useIsClient();
    const router = useRouter();
    //abstract this out.

    const authObject: {token: string | null} = {token:''};
        if (isClient){
        authObject.token = window.localStorage.getItem('token')
        }

// can be accessed via the routes file instead.
const postAuthData = async () => {

    try{
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'checkAuth', authObject );
    }
    catch{
        if(isClient){router.push('/login')};
    }

}

postAuthData();

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

const handleSubmit = async (event: any) => {
    event.preventDefault();
    let isValErrors = false;
    for (const value of Object.values(invalidFields)){
        if (value){
            console.log(value, 'error');
            isValErrors = true;
            setShowErrorDialogue(true);
        }
    }
    if(isValErrors){
        return;
    };
    console.log(eventObject);
   const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'postEvent', eventObject );
   console.log(response.data);

};

const handleChange = (event: IInputChangeEvent) => {
    dispatch({type: event.target.id, payload: event.target.value});
    let isValErrors = false;
    for(const value of Object.values(invalidFields)){
        if(value){
            console.log(value, 'error')
            isValErrors = true;
            setShowErrorDialogue(true);
        }
    }
    if(!isValErrors){
        setShowErrorDialogue(false);
    }
};

const validate = (event?: IInputChangeEvent, field?: string) => {
const type = event?.target.id || field;
switch(type){
    case 'name':
        if (eventObject[type].length < 3){
            console.log(eventObject[type].length, 'length');
            setInvalidFields(() => {return {...invalidFields, name: true}})
            setShowErrorDialogue(true);
            return false;
        }
        else setInvalidFields(() => {return {...invalidFields, name: false}})
        break;
    case 'description':
        if (eventObject[type].length < 10){
            setInvalidFields(() => {return {...invalidFields, description: true}})
            setShowErrorDialogue(true);
            return false;
        }
        else setInvalidFields(() => {return {...invalidFields, description: false}})
        break;
    case 'town':
        if (eventObject[type].length < 3){
            setInvalidFields(() => {return {...invalidFields, town: true}})
            setShowErrorDialogue(true);
            return false;
        }
        else setInvalidFields(() => {return {...invalidFields, town: false}})
        break;
        case 'contact':
            if (!eventObject[type].includes('@')){
                setInvalidFields(() => {return {...invalidFields, contact: true}})
                setShowErrorDialogue(true);
                return false;
            }
            else setInvalidFields(() => {return {...invalidFields, contact: false}})
            break;
            default:
                return true;
        }
    }  

    const handleValidate = (event: IInputChangeEvent) => {
        validate(event);
    }

    return (

          <>
      <Header/>
      <TitleBanner text='Create an Event'/>
    <form onSubmit={handleSubmit} className={classes.formWrapper}>
    {showErrorDialogue &&
    <div className={classes.errorBox}>There was an error in the details you submitted</div>
    }
    <label htmlFor='name' className={classes.inputLabel}>Event Name</label>
    <input type='text' id='name' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.name ? classes.inputInvalid : ''}`}></input>
    <label htmlFor='description' className={classes.inputLabel}>Event Description</label>
    <input type='text' id='description' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.description ? classes.inputInvalid : ''}`}></input>
    <label htmlFor='town' className={classes.inputLabel}>Town</label>
    <input type='text' id='town' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.town ? classes.inputInvalid : ''}`}></input>
    <label htmlFor='contact' className={classes.inputLabel}>Contact Email</label>
    <input type='text' id='contact' onChange={handleChange} onBlur={handleValidate} className={`${classes.formField} ${invalidFields.contact ? classes.inputInvalid : ''}`}></input>
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