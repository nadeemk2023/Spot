// import express from "express";
// import bcrypt from "bcryptjs";
// import { User } from "../models";
// import keys from "../config/keys";
// import jwt from "jsonwebtoken";
// import { requireAuth } from "../middleware";
// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// router.route("/dogparks").get(async (req, res) => {
//   const userLocation = req.query.location;
//   const apiKey = process.env.PIPICAN_API_KEY;
//   try {
//     const response = await axios.get(
//       `https://api.pipican.com/dogparks?location=${userLocation}&key=${apiKey}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });

// export default router;
