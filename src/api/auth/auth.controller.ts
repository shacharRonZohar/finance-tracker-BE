import { Request, Response } from 'express'
import { authService } from './auth.service.js'
import { logger } from '../../services/logger.service.js'

export async function login(req: Request, res: Response) {
  const { username, password } = req.body
  try {
    console.log(req.cookies)
    const user = await authService.login({ username, password })
    const loginToken = authService.getLoginToken(user)
    logger.info('User login: ', user)
    res.cookie('loginToken', loginToken, { secure: true })
    res.send(user)
  } catch (err) {
    logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const credentials = req.body
    console.log('credentials', credentials)
    // Never log passwords
    const account = await authService.signup(credentials)
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login({ username: credentials.username, password: credentials.password })
    logger.info('User signup:', user)
    const loginToken = authService.getLoginToken(user)
    res.cookie('loginToken', loginToken, { sameSite: false, secure: true })
    res.json(user)
  } catch (err) {
    logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('loginToken')
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}

export async function getLoggedInUser(req: Request, res: Response) {
  try {
    const user = authService.validateToken(req.cookies.loginToken)
    console.log('req.cookies', user)
    res.send(user)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get user' })
  }
}
