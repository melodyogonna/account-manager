import { z } from "zod";

import { BadOperationError } from "../../../shared/error";

import { AccountDBInterface } from "../types";
import { Account } from "../account.entity";
import { AccountFactory } from "../account.factory";

type AccountInput = {
  holder_name: string;
  holder_dob: string | Date;
  initial_balance: number;
  account_type: string;
}

export class NewAccountService {
  private db: AccountDBInterface;

  /** We'll need to store created account in a persistent storage, as well as checking for uniqueness,
   * we require a storage medium.
   * @param db - Database to use for storage
   */
  constructor(db: AccountDBInterface) {
    this.db = db;
  }

  /**
  * Create and return a new bank account with the passed input.
  * @param input - Data holding details of user to create account for.
  */
  async createAccount(input: AccountInput): Promise<Account> {
    const validated = this.validateInputs(input);
    const accountNumber = await this.generateAccountNumber();
    const account = AccountFactory.newAcount(validated.holder_name,
      new Date(validated.holder_dob),
      validated.account_type,
      accountNumber,
      validated.initial_balance
    )
    await this.db.create(account);
    return account;

  }

  private validateInputs(data: AccountInput) {
    const accountSchema = z.object({
      holder_name: z.string(),
      holder_dob: z.date(),
      initial_balance: z.number().gt(1),
      account_type: z.enum(["saving", "current", "checking"])
    })

    const result = accountSchema.safeParse(data);
    if (!result.success) {
      throw new BadOperationError("")
    }
    return result.data
  }

  private async generateAccountNumber(): Promise<string> {
    // Generate an account number by generating numbers within the range of 1billion to 9billion and converting to string
    const generatedAccount = Math.floor(Math.random() * (9_000_000_000 - 1_000_000_000) + 1_000_000_000).toString();

    const accountExist = await this.db.find(generatedAccount);
    if (accountExist) {
      return this.generateAccountNumber()
    }

    return generatedAccount

  }
}
