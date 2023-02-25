import { Router } from 'express'
import { login, signup, logout } from './auth.controller.js'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/signup', signup)
authRouter.post('/logout', logout)
