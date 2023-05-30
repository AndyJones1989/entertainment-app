'use client'
import { AuthContext } from "@/app/context/auth-provider";
import { useContext } from "react";
import { getByIP } from "./location-getters";
import {calcDistance} from './results-sorter';
import Header from "../components/header/header";

const LandingPage = ()=> {
    const authStatus = useContext(AuthContext);
    window.localStorage.setItem('token', authStatus.authDetails.token);
    console.log(authStatus);

const distBetweenPoints = async (userLocation) =>{
console.log(userLocation);


// let a= calcDistance(userLocation.lat, userLocation.lon, 51.507, -0.1276 );
 //console.log(a);
}

const getLocation = () => new Promise(
    (resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          const userLocation = {
            lat:position.coords.latitude,
            long:position.coords.longitude
          };
          resolve(position) // Resolve with location. location can now be accessed in the .then method.
        },
        err => reject(err) // Reject with err. err can now be accessed in the .catch method.
      )
    }
  )

  getLocation();
}

export default LandingPage;