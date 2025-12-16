import express from "express";
import isAuthenticated from "../middleware/authmiddleware.js";
import { AppliedJob, getApplication, getAppliedJob, updateStatus } from "../Controllers/Application_controler.js";
const router=express.Router();

router.route("/apply/:id").post(isAuthenticated, AppliedJob);
router.route("/get").get(isAuthenticated,getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated, getApplication);

router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;