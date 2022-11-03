"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var userHandler_1 = __importDefault(require("./userHandler"));
var orderHandler_1 = __importDefault(require("./api/orderHandler"));
var productHandler_1 = __importDefault(require("./api/productHandler"));
var routes = express_1.Router();
routes.use('/users', userHandler_1["default"]);
routes.use('/order', orderHandler_1["default"]);
routes.use('/product', productHandler_1["default"]);
routes.get('/', function (req, res) {
    res.send('api');
});
exports["default"] = routes;
