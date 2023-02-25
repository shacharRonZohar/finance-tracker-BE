import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import type { NewUser, User } from '../../models/User'

export const userService = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  //   const criteria = _buildCriteria(filterBy)
  try {
    const collection = await _getUserCollection()
    var users = await collection.find().toArray()
    return users.map(user => {
      return getCleanUser(user)
    })
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

async function getById(userId: string) {
  try {
    const collection = await _getUserCollection()
    const user = await collection.findOne({ _id: new ObjectId(userId) })
    if (!user) return null
    return getCleanUser(user)
  } catch (err) {
    logger.error(`while finding user by id: ${userId}`, err)
    throw err
  }
}
async function getByUsername(username: string) {
  try {
    const collection = await _getUserCollection()
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    logger.error(`while finding user by username: ${username}`, err)
    throw err
  }
}

async function remove(userId: string) {
  try {
    const collection = await _getUserCollection()
    await collection.deleteOne({ _id: new ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user: User) {
  try {
    // peek only updatable properties
    const userToSave = {
      ...user,
      _id: new ObjectId(user._id), // needed for the returnd obj
    }
    const collection = await _getUserCollection()
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user: NewUser) {
  try {
    // peek only updatable fields!
    const userToAdd = {
      username: user.username,
      password: user.password,
    }
    const collection = await _getUserCollection()
    await collection.insertOne(userToAdd as User)
    return userToAdd
  } catch (err) {
    logger.error('cannot add user', err)
    throw err
  }
}

function getCleanUser(user: User) {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

function _getUserCollection() {
  return dbService.getCollection<User>('user')
}
