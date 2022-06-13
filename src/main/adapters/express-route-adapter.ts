import { Request, RequestHandler, Response } from 'express'
import { Controller } from '../../presentation/protocols'
import { HttpRequest } from './../../presentation/protocols/http'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
