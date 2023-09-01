class BaseError extends Error {
  status: number
  meta?: Record<any, any>

  constructor(message: string, meta?: Record<any, any>) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.meta = meta;
  }
}

export class EntityExistsError extends BaseError {
  constructor(message: string, meta?: Record<any, any>) {
    super(message, meta);
    this.status = 400
  }
}

export class EntityNotFoundError extends BaseError {
  constructor(message: string, meta?: Record<any, any>) {
    super(message, meta);
    this.status = 404
  }
}


export class BadOperationError extends BaseError {

  constructor(message: string, meta?: Record<any, any>) {
    super(message, meta)
    this.status = 400
  }
}
