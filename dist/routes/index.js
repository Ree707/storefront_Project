"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var userRoutes_1 = __importDefault(require("./api/userRoutes"));
var orderRoutes_1 = __importDefault(require("./api/orderRoutes"));
var productRoutes_1 = __importDefault(require("./api/productRoutes"));
var orderProductsRoute_1 = __importDefault(require("./api/orderProductsRoute"));
var routes = (0, express_1.Router)();
routes.use('/users', userRoutes_1["default"]);
routes.use('/order', orderRoutes_1["default"]);
routes.use('/product', productRoutes_1["default"]);
routes.use('/order_products', orderProductsRoute_1["default"]);
routes.get('/', function (req, res) {
    res.send('api');
});
exports["default"] = routes;
