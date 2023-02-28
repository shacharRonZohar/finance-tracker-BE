import { getLoggedInUser } from '../auth/auth.controller.js'
import { monthDataService } from './monthData.service.js'
import { logger } from '../../services/logger.service.js'
import { authService } from '../auth/auth.service.js'
import type { Request, Response } from 'express'
import { User } from '../../models/User.js'
import { ObjectId } from 'mongodb'

export async function getMonthData(req: Request, res: Response) {
  try {
    // const user = await getLoggedInUser(req,res)
    // const { month } = req.body
    // console.log('req.body:', req.body)
    const year = +req.params.year
    const month = +req?.query?.month! || 0
    const user = authService.validateToken(req.cookies.loginToken)
    if (!user) throw new Error('No user found')
    // const user: User = {
    //   _id: new ObjectId('63fa32804e5ce2b8baa62274'),
    //   username: 'demo',
    //   password: 'demo',
    // }

    const monthData = await monthDataService.getByMonth({ user, month, year })
    // const monthData = await monthDataService.getByMonth(req.body)
    res.send(monthData)
  } catch (err) {
    logger.error('Failed to get monthData', err)
    res.status(500).send({ err: 'Failed to get monthData' })
  }
}

// export async function getUsers(req: Request, res: Response) {
//   try {
//     const filterBy = {
//       txt: req.query?.txt || '',
//       minBalance: +req?.query?.minBalance! || 0,
//     }
//     const users = await userService.query(filterBy)
//     res.send(users)
//   } catch (err) {
//     logger.error('Failed to get users', err)
//     res.status(500).send({ err: 'Failed to get users' })
//   }
// }

// export async function deleteUser(req: Request, res: Response) {
//   try {
//     await userService.remove(req.params.id)
//     res.send({ msg: 'Deleted successfully' })
//   } catch (err) {
//     logger.error('Failed to delete user', err)
//     res.status(500).send({ err: 'Failed to delete user' })
//   }
// }

// export async function updateUser(req: Request, res: Response) {
//   try {
//     const user = req.body
//     const savedUser = await userService.update(user)
//     res.send(savedUser)
//   } catch (err) {
//     logger.error('Failed to update user', err)
//     res.status(500).send({ err: 'Failed to update user' })
//   }
// }
