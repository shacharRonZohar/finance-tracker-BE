var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import { config } from '../../config/index.js';
import { logger } from './logger.service.js';
export const dbService = {
    getCollection,
    addToCollection,
};
let dbConn = null;
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield connect();
            const collection = yield db.collection(collectionName);
            return collection;
        }
        catch (err) {
            logger.error('Failed to get Mongo collection', err);
            throw err;
        }
    });
}
function addToCollection(collectionName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield getCollection(collectionName);
            yield collection.insertOne(data);
            return data;
        }
        catch (err) {
            logger.error('Failed to add to Mongo collection', err);
            throw err;
        }
    });
}
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbConn)
            return dbConn;
        try {
            const client = yield MongoClient.connect(config.dbURL);
            const db = client.db(config.dbName);
            dbConn = db;
            return db;
        }
        catch (err) {
            logger.error('Cannot Connect to DB', err);
            throw err;
        }
    });
}
