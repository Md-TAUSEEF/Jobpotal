import express from "express"
import isAuthenticated from "../middleware/authmiddleware.js";
import { getAdminjob, getAlljob, getJobId, postJob } from "../Controllers/Job_controller.js";
const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAlljob);
router.route("/getadminjob").get(isAuthenticated,getAdminjob);
router.route("/get/:id").get(isAuthenticated,getJobId);


export default router;
