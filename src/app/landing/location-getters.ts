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