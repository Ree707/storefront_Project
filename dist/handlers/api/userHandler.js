"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
//In each handler file, create RESTful endpoints for each model method.
var express_1 = require("express");
var user_1 = require("../../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//export const userHandler = express.Router();
var User = new user_1.userStore();
//index all users 
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.getAllusers()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//show one user by id 
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, id, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                try {
                    authorizationHeader = _req.headers.authorization;
                    token = authorizationHeader.split(' ')[1];
                    jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
                }
                catch (err) {
                    res.status(401);
                    res.json('Access denied, invalid token');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = parseInt(_req.params.id);
                return [4 /*yield*/, User.showUser(id)];
            case 2:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//create new user
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userInfo, user, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userInfo = {
                    firstName: _req.body.firstName,
                    lastName: _req.body.lastName,
                    password: _req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.createUser(_req.body)];
            case 2:
                user = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//token authenticate 
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, u, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    id: req.body.id,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.authenticate(user.id, user.password)];
            case 2:
                u = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: u }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(401);
                res.json({ error: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var userHandler = express_1.Router();
userHandler.get('/', index);
userHandler.get('/users/:id', show);
userHandler.post('/users', create);
exports["default"] = userHandler;
/*
userHandler.get('/users', async (_req: Request, res: Response) =>{
    try {
         const users= await User.getAllusers();
         return res.json(users);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
})


userHandler.get('/users/:id', async (_req: Request, res: Response) =>{
    try {
         const id: Number = parseInt(req.params.id);
         const user: user= await User.showUser(id);
         return res.json(user);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
})

userHandler.post('/users', async (_req: Request, res: Response) =>{
    try {
         const user: user = await User.createUser(req.body);
         return res.json(user);
    } catch (err) {
         res.status(400)
        res.json(err)
    }
})
*/
