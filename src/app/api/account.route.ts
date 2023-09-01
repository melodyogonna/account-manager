import { Router } from "express";

import { createAccount, getAccount, getAccounts } from "../services";
import { validateInput } from "../middlewares/validation";
import { createAccountValidation } from "../validations/account.validator";

const router = Router()

router.post("/create", validateInput(createAccountValidation), createAccount);
router.get("/:accountNumber", getAccount);
router.get("", getAccounts);

export default router;
