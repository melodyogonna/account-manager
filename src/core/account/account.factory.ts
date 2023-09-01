import { Account } from "./account.entity";
import { AccountType } from "./accounttype.value";

export class AccountFactory {
  /** Instantiate an account Entity
   * @param name - Account holder name
   * @param type - Account type - checking, saving, current, etc
   * @param balance - Balance in account
   * @param accountNumber - Account number
   * @returns Account entity
   * */
  static newAcount(name: string, dob: Date, type: string, accountNumber: string, balance: number): Account {
    const accountType = new AccountType(type);
    return new Account(name, dob, accountType, accountNumber, balance);
  }
}
