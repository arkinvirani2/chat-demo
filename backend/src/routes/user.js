import express from "express";
import schemaValidator from "../middleware/schema-validator.js";
import userSchema from "../schemas/user.js";
import {
  createUserController,
  getUsersContoller,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", schemaValidator(userSchema), createUserController);
router.get("/", getUsersContoller);

export default router;
