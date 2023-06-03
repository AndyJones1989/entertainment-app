'use client'
import { AuthContext } from "@/app/context/auth-provider";
import { useCallback, useContext, useState } from "react";
import { getByIP } from "./location-getters";
import Header from "../components/header/header";
import React from "react";
import axios from "axios";

type Location = {
    lat: number;
    lon: number;
}

type Activity = {
    _id: string;
    name: string;
    contact: string;
    latitude: number;
    longitude: number;
}

const LandingPage = ()=> {
    const authStatus = useContext(AuthContext);
    const [userLocation, setUserLocation] = useState({lat: 0, lon: 0});
    const [activities, setActivities] = useState<Activity[]>([]);

const handleGPS = useCallback((geoLocation: any ) => {
    setUserLocation({lat: geoLocation.coords.latitude, lon: geoLocation.coords.longitude})
    window.localStorage.setItem('lat', userLocation.lat.toString());
    window.localStorage.setItem('lon', userLocation.lon.toString());
    }, [userLocation])    

const handleNoGPS= async ()=>{
    console.log('reverting to IP');
    const ipLocation = await getByIP();
// currently has city-level accuracy. Sometimes thinks I'm in Huddersfield...
//@ts-expect-error
    setUserLocation(ipLocation);
    }

React.useMemo(()=>{
    const options = {
        timeout: 500
    }
    if(globalThis.window){
    navigator.geolocation.getCurrentPosition(handleGPS, handleNoGPS, options);
    }
    else {handleNoGPS()}

}, [])

const fetchActivities = async()=>{
    if(activities.length === 0){
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'activities', userLocation )
        console.log(response.data);
        setActivities(response.data);
    }
}


fetchActivities();

const activityRender = (activities.length !== 0) ? (activities.map((activity)=>{
    return (
        <div key={activity.name}>{activity.name}</div>
    )
})) : (<div>Loading Activities</div>)

  return(
    <>
    <Header isLoggedIn={authStatus.authDetails.isAuthenticated}/>
    <div>{userLocation.lat}</div>
    <div>{userLocation.lon}</div>
    {activityRender}
    </>
  )
}

export default LandingPage;