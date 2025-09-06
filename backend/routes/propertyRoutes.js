import express from "express";
import { getProperties, getPropertyById, addProperty } from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";
//routing kar rha 
const router = express.Router();

router.get("/", getProperties); // login page admin login
router.get("/:id", getPropertyById);// from this rout you can see post 
router.post("/", protect, addProperty);// adding property 

export default router;
