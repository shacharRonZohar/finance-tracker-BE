var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userService } from './user.service.js';
import { logger } from '../../services/logger.service.js';
export function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userService.getById(req.params.id);
            res.send(user);
        }
        catch (err) {
            logger.error('Failed to get user', err);
            res.status(500).send({ err: 'Failed to get user' });
        }
    });
}
export function getUsers(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filterBy = {
                txt: ((_a = req.query) === null || _a === void 0 ? void 0 : _a.txt) || '',
                minBalance: +((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.minBalance) || 0,
            };
            const users = yield userService.query(filterBy);
            res.send(users);
        }
        catch (err) {
            logger.error('Failed to get users', err);
            res.status(500).send({ err: 'Failed to get users' });
        }
    });
}
export function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield userService.remove(req.params.id);
            res.send({ msg: 'Deleted successfully' });
        }
        catch (err) {
            logger.error('Failed to delete user', err);
            res.status(500).send({ err: 'Failed to delete user' });
        }
    });
}
export function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const savedUser = yield userService.update(user);
            res.send(savedUser);
        }
        catch (err) {
            logger.error('Failed to update user', err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
