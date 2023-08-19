"use client";
import ActivityCard from "../components/activity-card/activity-card";
import tempImage from "../../../assets/welcome-image.webp";
import { useCallback, useContext, useState } from "react";
import { getByIP } from "./location-getters";
import Header from "../components/header/header";
import React from "react";
import axios from "axios";
import { useIsClient } from "../context/is-client-ctx";

type Location = {
  lat: number;
  lon: number;
};

type Activity = {
  _id: string;
  name: string;
  contact: string;
  latitude: number;
  longitude: number;
  description: string;
  distance: number;
};

const LandingPage = () => {
  const isClient = useIsClient();
  const [userLocation, setUserLocation] = useState<Location>({
    lat: 0,
    lon: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const options = {
    timeout: 500,
  };

  const handleGPS = useCallback((geoLocation: any) => {
    setUserLocation({
      lat: geoLocation.coords.latitude,
      lon: geoLocation.coords.longitude,
    });
    //these need linking with an expiry time for refresh
    if (isClient) {
      window.localStorage.setItem(
        "lat",
        geoLocation.coords.latitude.toString()
      );
      window.localStorage.setItem(
        "lon",
        geoLocation.coords.longitude.toString()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNoGPS = async () => {
    console.log("reverting to IP");
    const ipLocation: Location | null = await getByIP();
    // currently has city-level accuracy. Sometimes thinks I'm in Huddersfield...
    //@ts-expect-error
    setUserLocation(ipLocation);
  };

  if (
    isClient &&
    (!window.localStorage.getItem("lat") || !window.localStorage.getItem("lon"))
  ) {
    if (isClient && userLocation.lat === 0) {
      navigator.geolocation.getCurrentPosition(handleGPS, handleNoGPS, options);
    } else if (userLocation.lat === 0) {
      handleNoGPS();
    }
  } else {
    if (userLocation.lat === 0 && isClient) {
      setUserLocation({
        lat: Number(window.localStorage.getItem("lat")),
        lon: Number(window.localStorage.getItem("lon")),
      });
    }
  }

  const fetchActivities = useCallback(async () => {
    if (activities.length === 0) {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "activities",
          userLocation
        );
        setActivities(response.data);
      } catch {
        console.log("fetch error");
      }
    }
  }, [activities, userLocation]);

  React.useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const activityRender =
    activities.length !== 0 ? (
      activities.map((activity) => {
        return (
          <ActivityCard
            key={activity.name}
            title={activity.name}
            imageRef={tempImage}
            description={activity.description}
            contact={activity.contact}
            distance={activity.distance}
            priority={false}
          />
        );
      })
    ) : (
      <div>Loading Activities</div>
    );

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          width: "80%",
          margin: " 0 auto",
          gap: "24px",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {activityRender}
      </div>
    </>
  );
};

export default React.memo(LandingPage);
