import validator from "validator";
import { z } from "zod";

export const createAccountValidation = z.object({
  holder_name: z.string(),
  holder_dob: z.string().refine(v => validator.isDate(v), { message: 'DOB should be a valid date' }),
  account_type: z.string(),
  initial_balance: z.string()
})
