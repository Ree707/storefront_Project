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
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../order");
var user_1 = require("../user");
var product_1 = require("../product");
var database_1 = __importDefault(require("../../database"));
var store = new order_1.orderStore();
var uStore = new user_1.userStore;
var pStore = new product_1.productStore;
describe('order model database action', function () {
    //create user and product then create active order for that user 
    var testUser = {
        firstName: 'usertest',
        lastName: 'test',
        user_password: 'test123'
    };
    var testProdcut = {
        product_name: 'testProduct',
        price: 10
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, createdProduct, conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uStore.createUser(testUser)];
                case 1:
                    createdUser = _a.sent();
                    testUser.id = createdUser.id;
                    return [4 /*yield*/, pStore.createProduct(testProdcut)];
                case 2:
                    createdProduct = _a.sent();
                    testProdcut.id = createdProduct.id;
                    return [4 /*yield*/, database_1.default.connect()];
                case 3:
                    conn = _a.sent();
                    sql = 'INSERT INTO orders (product_id, userid,quantity,order_status) VALUES ($1,$2,$3,$4) RETURNING *;';
                    return [4 /*yield*/, conn.query(sql, [testProdcut.id, testUser.id, 1, 'active',])];
                case 4:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = 'DELETE FROM orders; DELETE FROM users; DELETE FROM PRODUCT';
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    //test get active order for user 
    it('should return a list of all active order to that user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.getActiveOrder(testUser.id)];
                case 1:
                    result = _a.sent();
                    console.log(result[0].order_status);
                    expect(result[0].order_status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
});
