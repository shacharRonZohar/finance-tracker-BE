import { NextFunction, Request, Response } from 'express'
import { authService } from '../api/auth/auth.service'
import { User } from '../models/User'

interface RequestWithUser extends Request {
  loggedinUser?: User
}

export function requireAuth(req: RequestWithUser, res: Response, next: NextFunction) {
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  req.loggedinUser = loggedinUser
  next()
}
