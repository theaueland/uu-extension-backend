import { Request, Response, NextFunction } from 'express'

class serverError extends Error {
  statusCode: number

  constructor (statusCode: number, message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}

const error_responder = (err: serverError, _request: Request, response: Response, _next: NextFunction) => {
  response.header('Content-Type', 'application/json');
  response.json({ error: err.message, status: err.statusCode || 400 })

  if (response.statusCode === 200) { response.statusCode = 400; }
}

export { error_responder }
