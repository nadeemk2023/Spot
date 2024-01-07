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
      const pipicanOptions = {
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

      const pipicanResponse = await axios.request(pipicanOptions);
      const parks = pipicanResponse.data.result || [];

      const parksWithAddress = await Promise.all(
        parks.map(async (park) => {
          const lat = park.coords.lat;
          const lon = park.coords.lon;

          const nominatimResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const address = nominatimResponse.data.display_name;
          return { ...park, address };
        })
      );

      setDogParks(parksWithAddress);
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
