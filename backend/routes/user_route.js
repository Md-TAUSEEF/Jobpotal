import express from "express"
 import { login, logout, register, updateProfile } from "../Controllers/User_controller.js";
import isAuthenticated from "../middleware/authmiddleware.js";
import singleUpload from "../middleware/multer.js";
const router=express.Router();


router.post("/register", singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);


export default router;
