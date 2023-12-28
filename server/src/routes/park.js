import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
// import keys, { app } from "../config/keys";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const { lat, lng } = req.query;
    const response = await axios({
      method: "POST",
      url: "https://pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com/nearby-basic",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a8cae885b6msha39d1a7a8eccfd1p1759bajsn2ffd7e679a1f",
        "X-RapidAPI-Host":
          "pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com",
      },
      data: {
        coords: 
        // { lat, lng }
        { 
          lat: 41.378442396701416, 
          lng: 2.0965230925291145 
        },
        radius: 1,
        leisure: "dog_park",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
