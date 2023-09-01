import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateInput(schema: z.Schema) {
  return function(request: Request, response: Response, next: NextFunction) {
    const result = schema.safeParse(request.body);
    if (result.success) {
      next()
    } else {
      const error = result.error.flatten();
      return response.status(400).json({ error: error.fieldErrors, message: 'There are some errors in your input' })
    }
  }
}
