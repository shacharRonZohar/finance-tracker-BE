import { MongoClient } from 'mongodb'
import { config } from '../../config'
import { logger } from './logger.service'

import type { Db } from 'mongodb'

export const dbService = {
  getCollection,
}

let dbConn: Db | null = null

async function getCollection(collectionName: string) {
  try {
    const db = await connect()
    const collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    logger.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db(config.dbName)
    dbConn = db
    return db
  } catch (err) {
    logger.error('Cannot Connect to DB', err)
    throw err
  }
}
