import { Router } from "express";
import AccountAPI from './account.route'

const router = Router();
router.use("/accounts", AccountAPI)
export default router;
