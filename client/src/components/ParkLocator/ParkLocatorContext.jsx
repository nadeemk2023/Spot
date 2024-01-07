import React, { createContext, useState } from "react";
import axios from "axios";

export const ParkContext = createContext();

export const ParkProvider = ({ children }) => {
  const [dogParks, setDogParks] = useState([]);

  const parkImages = ["dogs1.jpg", "dogs2.jpg", "dogs3.jpg"];

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(coords);
      }, reject);
    });
  }

  const fetchParks = async () => {
    try {
      const userCoords = await getCurrentLocation();
      const options = {
        method: "POST",
        url: "https://pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com/nearby-basic",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "a8cae885b6msha39d1a7a8eccfd1p1759bajsn2ffd7e679a1f",
          "X-RapidAPI-Host":
            "pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com",
        },
        data: {
          coords: userCoords,
          radius: 5,
          leisure: "dog_park",
        },
      };

      const response = await axios.request(options);
      console.log("API response", response.data);
      setDogParks(response.data.result || []);
      console.log("dog parks", response.data.result);
    } catch (error) {
      console.error(error);
      setDogParks([]);
    }
  };

  return (
    <ParkContext.Provider value={{ dogParks, fetchParks, parkImages }}>
      {children}
    </ParkContext.Provider>
  );
};
