import { type Document, MongoClient, OptionalUnlessRequiredId, OptionalId } from 'mongodb'
import { config } from '../../config/index.js'
import { logger } from './logger.service.js'

import type { Db } from 'mongodb'

export const dbService = {
  getCollection,
  addToCollection,
}

let dbConn: Db | null = null

async function getCollection<T extends Document>(collectionName: string) {
  try {
    const db = await connect()
    const collection = await db.collection<T>(collectionName)
    return collection
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function addToCollection<T extends Document>(collectionName: string, data: T) {
  try {
    const collection = await getCollection(collectionName)
    await collection.insertOne(data)
    return data
  } catch (err) {
    logger.error('Failed to add to Mongo collection', err)
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(config.dbURL)
    const db = client.db(config.dbName)
    dbConn = db
    return db
  } catch (err) {
    logger.error('Cannot Connect to DB', err)
    throw err
  }
}
