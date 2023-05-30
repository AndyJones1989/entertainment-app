export const getByIP = async ()=>{
    let request = await fetch('https://ipapi.co/json/');
    const data = await request.json()
    try {
    const userLocation = {
      lat: Number(data.latitude),
      lon: Number(data.longitude)
    }
    return userLocation;
  }
  catch {
      return null;
  }
    };
  
   export const getByGPS = async () => {

    navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSFail);
    }

    const onGPSSuccess = (position: any) => {
        const userLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
        return userLocation;
    }

    const onGPSFail = () => {
        console.log('GPSFail');
    }