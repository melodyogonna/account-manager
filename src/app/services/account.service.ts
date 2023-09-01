import { NextFunction, Request, Response } from "express";

import { NewAccountService } from "../../core/account";
import { AccountMemoryRepository } from "../../shared/db/repository/account.repo";
import { EntityNotFoundError } from "../../shared/error";

/** Create a new account */
export async function createAccount(request: Request, response: Response, next: NextFunction) {
  try {
    const newAccountService = new NewAccountService(AccountMemoryRepository.new());
    const account = await newAccountService.createAccount(request.body);
    const { dob, ...rest } = account.data;
    return response.status(201).json({ message: "Account created", data: rest });

  } catch (error) {
    next(error)
  }
}

/** Get one account based on passed parameter */
export async function getAccount(request: Request, response: Response, next: NextFunction) {
  try {
    const db = AccountMemoryRepository.new();
    const params = request.params
    const account = await db.find(params.accountNumber as string);
    if (!account) {
      throw new EntityNotFoundError("Account not found")
    }
    const { dob, ...rest } = account.data;
    return response.json({ message: "Account returned", data: rest });

  } catch (error) {
    next(error)

  }
}

/** Get all accounts */
export async function getAccounts(request: Request, response: Response, next: NextFunction) {
  try {
    const db = AccountMemoryRepository.new();
    const accounts = await db.findMany();
    return response.json({ message: "All accounts", data: accounts.map(a => a.data) });

  } catch (error) {
    next(error)
  }
}
