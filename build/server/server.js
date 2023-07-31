"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpError = void 0;
const express_1 = __importDefault(require("express"));
const indexRouter_1 = require("./controller/indexRouter");
const storageRouter_1 = require("./controller/storageRouter");
const errorHandling_1 = require("./middleware/errorHandling");
// ----------------------------------------------------------------------------
const server = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const createHttpError = require('http-errors');
exports.createHttpError = createHttpError;
// ----------------------------------------------------------------------------
server.use(express_1.default.json());
server.use('/storage', storageRouter_1.storageRouter);
server.use('/', indexRouter_1.indexRouter);
server.use(createHttpError);
server.use(errorHandling_1.error_responder);
// ----------------------------------------------------------------------------
server.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
