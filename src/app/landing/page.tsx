'use client'
import { AuthContext } from "@/app/context/auth-provider";
import { useContext, useState } from "react";
import { getByIP } from "./location-getters";
import {calcDistance} from './results-sorter';
import Header from "../components/header/header";
import React from "react";

type Location = {
    lat: number;
    lon: number;
}

const LandingPage = ()=> {
    const authStatus = useContext(AuthContext);
    window.localStorage.setItem('token', authStatus.authDetails.token);
    console.log(authStatus);
    const [userLocation, setUserLocation] = useState({lat: 0, lon: 0});

const handleGPS = (geoLocation: any ) => {
console.log('gps route');
console.log(geoLocation);
// will eventually set the user's actual GPS location
}    

const handleNoGPS= async ()=>{
    console.log('reverting to IP');
const ipLocation = await getByIP();
// currently has city-level accuracy. Sometimes thinks I'm in Huddersfield...
//@ts-expect-error
setUserLocation(ipLocation);
console.log(ipLocation);
}

React.useMemo(()=>{
    const options = {
        timeout: 500
    }
navigator.geolocation.getCurrentPosition(handleGPS, handleNoGPS, options);
}, [])

  let distToLeeds = calcDistance(userLocation.lat, userLocation.lon, 51.507, -0.1276 );

  return(
    <>
    <Header isLoggedIn={authStatus.authDetails.isAuthenticated}/>
    <div>this is the landing page, where the nearest available activities will be shown</div>
    <div>You are {distToLeeds} km from Leeds</div>
    </>
  )
}

export default LandingPage;