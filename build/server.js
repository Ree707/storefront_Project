"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: 'http://localhost',
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/api', index_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/test-cors', (0, cors_1.default)(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middle ware' });
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
