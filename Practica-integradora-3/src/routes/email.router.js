import { Router } from "express";
import { sendEmailController } from "../controllers/email.controller.js";

const router = Router();

router.get("/", sendEmailController);

export default router;
