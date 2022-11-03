"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var validateToken = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        console.log(authHeader);
        if (authHeader) {
            var bearer = authHeader.split(' ')[0].toLowerCase();
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                var decode = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
                if (decode) {
                    next();
                }
                else {
                    //authentication failed 
                    res.send('failed to authenticate, unauthorized access');
                }
            }
            else {
                //token type not bearer 
                res.send('no token, unauthorized access');
            }
            //no token 
        }
        else {
            res.send('no token, unauthorized access');
        }
    }
    catch (error) {
    }
};
exports.default = validateToken;
