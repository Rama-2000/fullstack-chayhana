// foodRoute.js
import express from "express";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js"; // Import the updateFood function
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", updateFood); // Add this line to define the update route

export default foodRouter;