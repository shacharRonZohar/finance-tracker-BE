var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { authService } from './auth.service.js';
import { monthDataService } from '../monthData/monthData.service.js';
import { logger } from '../../services/logger.service.js';
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield authService.login({ username, password });
            const loginToken = authService.getLoginToken(user);
            logger.info('User login: ', user);
            res.cookie('loginToken', loginToken, { secure: true, sameSite: 'none' });
            res.send(user);
        }
        catch (err) {
            logger.error('Failed to Login ' + err);
            res.status(401).send({ err: 'Failed to Login' });
        }
    });
}
export function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = req.body;
            // Never log passwords
            const account = yield authService.signup(credentials);
            logger.debug(`auth.route - new account created: ` + JSON.stringify(account));
            const user = yield authService.login({ username: credentials.username, password: credentials.password });
            monthDataService.addYearData(user._id, new Date().getFullYear());
            logger.info('User signup:', user);
            const loginToken = authService.getLoginToken(user);
            res.cookie('loginToken', loginToken, { sameSite: 'none', secure: true });
            res.json(user);
        }
        catch (err) {
            logger.error('Failed to signup ' + err);
            res.status(500).send({ err: 'Failed to signup' });
        }
    });
}
export function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('loginToken');
            res.send({ msg: 'Logged out successfully' });
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to logout' });
        }
    });
}
export function getLoggedInUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = authService.validateToken(req.cookies.loginToken);
            if (!user)
                res.status(204);
            res.send(user);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get user' });
        }
    });
}
