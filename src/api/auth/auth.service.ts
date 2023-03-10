import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'
import { userService } from '../user/user.service.js'
import { logger } from '../../services/logger.service.js'
import type { CleanUser, NewUser, User } from '../../models/User'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-1234')

export const authService = {
  signup,
  login,
  getLoginToken,
  validateToken,
}

async function login({ username, password }: NewUser) {
  logger.debug(`auth.service - login with username: ${username}`)

  const user = await userService.getByUsername(username)
  if (!user) throw new Error('Invalid username or password')
  const match = await bcrypt.compare(password, user.password)
  if (!match) return Promise.reject('Invalid username or password')
  const { password: userPass, ...userWithoutPassword } = user

  // user._id = user._id.toString()
  return userWithoutPassword
}

async function signup({ username, password }: NewUser) {
  const saltRounds = 10

  logger.debug(`auth.service - signup with username: ${username}`)
  if (!username || !password) throw new Error('Missing required signup information')

  const userExist = await userService.getByUsername(username)
  if (userExist) throw new Error('Username already taken')

  const hash = await bcrypt.hash(password, saltRounds)
  return userService.add({ username, password: hash })
}

function getLoginToken(user: CleanUser) {
  const userInfo = { _id: user._id, fullname: user.username }
  return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken: string) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser: User = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}

// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()
