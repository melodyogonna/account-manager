import { Entity } from "../../shared/types";
import { AccountType } from "./accounttype.value";
import { AccountData } from "./types";

export class Account implements Entity<AccountData> {
  protected name: string;
  protected type: AccountType;
  protected accountNumber: string;
  protected holderDob: Date;
  protected balance: number;

  constructor(name: string, dob: Date, type: AccountType, accountNumber: string, balance: number) {
    this.name = name;
    this.type = type;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.holderDob = dob;
  }


  get data(): AccountData {
    return {
      name: this.name,
      type: this.type.name,
      accountNumber: this.accountNumber,
      balance: this.balance,
      dob: this.holderDob
    }
  }
}
