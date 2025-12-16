import expres from "express";
import isAuthenticated from "../middleware/authmiddleware.js";
import { getCompany, getCompapnyId, registerCompany, updateCompany } from "../Controllers/Company_controller.js";
import singleUpload from "../middleware/multer.js"
const router=expres.Router();
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompapnyId);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

export default router;