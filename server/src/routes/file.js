import { Router } from "express";
import { uploadImage } from "../controllers/file.controller";

const fileRoutes = Router();

fileRoutes.route("/images").post(uploadImage);

export default fileRoutes;