import { z } from "zod";
import validator from 'validator'

import { Account, AccountData, AccountFactory } from "../../../core/account";
import { BadOperationError, EntityExistsError } from "../../error";



export class AccountMemoryRepository {
  private accounts: AccountData[] = [];

  /** Create a new record for the given account instance
   * @param account - Account to save.
   */
  async create(account: Account): Promise<void> {
    if (await this.find(account.data.accountNumber) !== null) {
      throw new EntityExistsError("An Account already exist with this account number")
    }
    this.accounts.push(account.data);
  }

  /**
  * Given an accountNumber number, return the account associated with the account number if said 
  * account exist, or null otherwise.
  * @param accountNumber - Account number to search
  */
  async find(accountNumber: string): Promise<Account | null> {
    const parsed = z.string().refine(v => validator.isNumeric(v)).safeParse(accountNumber);
    if (!parsed.success) {
      throw new BadOperationError('Invalid Account Number ')
    }

    const account = this.accounts.find(e => e.accountNumber === parsed.data);
    if (!account) {
      return null
    }

    return AccountFactory.newAcount(account.name, account.dob, account.type, account.accountNumber, account.balance);
  }

  async findMany(filter?: Partial<AccountData>): Promise<Account[]> {
    const returnedAccounts: Account[] = [];
    if (filter) {
      const accounts = this.accounts.filter(e => Object.keys(filter).forEach(key => filter[key] === e[key]))
      accounts.forEach(a => {
        returnedAccounts.push(AccountFactory.newAcount(a.name, a.dob, a.type, a.accountNumber, a.balance))
      })
    } else {
      this.accounts.forEach(a => {
        returnedAccounts.push(AccountFactory.newAcount(a.name, a.dob, a.type, a.accountNumber, a.balance))
      })

    }
    return returnedAccounts
  }
}
