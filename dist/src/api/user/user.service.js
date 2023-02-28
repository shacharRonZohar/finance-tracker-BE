var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ObjectId } from 'mongodb';
import { dbService } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';
export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
};
function query(filterBy = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const criteria = _buildCriteria(filterBy)
        try {
            const collection = yield _getUserCollection();
            var users = yield collection.find().toArray();
            return users.map(user => {
                return getCleanUser(user);
            });
        }
        catch (err) {
            logger.error('cannot find users', err);
            throw err;
        }
    });
}
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield _getUserCollection();
            const user = yield collection.findOne({ _id: new ObjectId(userId) });
            if (!user)
                return null;
            return getCleanUser(user);
        }
        catch (err) {
            logger.error(`while finding user by id: ${userId}`, err);
            throw err;
        }
    });
}
function getByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield _getUserCollection();
            const user = yield collection.findOne({ username });
            return user;
        }
        catch (err) {
            logger.error(`while finding user by username: ${username}`, err);
            throw err;
        }
    });
}
function remove(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield _getUserCollection();
            yield collection.deleteOne({ _id: new ObjectId(userId) });
        }
        catch (err) {
            logger.error(`cannot remove user ${userId}`, err);
            throw err;
        }
    });
}
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable properties
            const userToSave = Object.assign(Object.assign({}, user), { _id: new ObjectId(user._id) });
            const collection = yield _getUserCollection();
            yield collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
            return userToSave;
        }
        catch (err) {
            logger.error(`cannot update user ${user._id}`, err);
            throw err;
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable fields!
            const userToAdd = {
                username: user.username,
                password: user.password,
            };
            const collection = yield _getUserCollection();
            yield collection.insertOne(userToAdd);
            return userToAdd;
        }
        catch (err) {
            logger.error('cannot add user', err);
            throw err;
        }
    });
}
function getCleanUser(user) {
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    return userWithoutPassword;
}
function _getUserCollection() {
    return dbService.getCollection('user');
}
