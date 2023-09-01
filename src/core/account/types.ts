import { Account } from "./account.entity";

export type AccountData = {
  name: string;
  balance: number;
  type: string;
  accountNumber: string;
  dob: Date;
}

export interface AccountDBInterface {
  create(account: Account): Promise<void>;
  find(accountNumber: string): Promise<Account | null>;
}
