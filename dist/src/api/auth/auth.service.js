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
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import { userService } from '../user/user.service.js';
import { logger } from '../../services/logger.service.js';
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-1234');
export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken,
};
function login({ username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug(`auth.service - login with username: ${username}`);
        const user = yield userService.getByUsername(username);
        if (!user)
            throw new Error('Invalid username or password');
        const match = yield bcrypt.compare(password, user.password);
        if (!match)
            return Promise.reject('Invalid username or password');
        const { password: userPass } = user, userWithoutPassword = __rest(user
        // user._id = user._id.toString()
        , ["password"]);
        // user._id = user._id.toString()
        return userWithoutPassword;
    });
}
function signup({ username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        logger.debug(`auth.service - signup with username: ${username}`);
        if (!username || !password)
            throw new Error('Missing required signup information');
        const userExist = yield userService.getByUsername(username);
        if (userExist)
            throw new Error('Username already taken');
        const hash = yield bcrypt.hash(password, saltRounds);
        return userService.add({ username, password: hash });
    });
}
function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.username };
    return cryptr.encrypt(JSON.stringify(userInfo));
}
function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser = JSON.parse(json);
        return loggedinUser;
    }
    catch (err) {
        console.log('Invalid login token');
    }
    return null;
}
// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()
