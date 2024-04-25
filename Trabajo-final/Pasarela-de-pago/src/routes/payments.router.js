import { Router } from "express";

const router = Router();

router.post("/payment-intents", paymentsController);

export default router;
