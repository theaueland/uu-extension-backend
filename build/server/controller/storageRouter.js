"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageRouter = void 0;
const express_1 = require("express");
const wcagButtons = __importStar(require("../../wcag/models/buttonsModel"));
const createHttpError = require('http-errors');
const storageRouter = (0, express_1.Router)();
exports.storageRouter = storageRouter;
storageRouter.get('/buttons', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield wcagButtons.getJson();
        res.send({ message: "get the JSON file from the database for buttons" });
    }
    catch (err) {
        next(createHttpError(401, err));
    }
}));
storageRouter.post('/saveButtons', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield wcagButtons.postJson(req.body);
        const responseMessage = "Successfully saved the JSON data: " + req.body;
        res.send({ message: responseMessage });
    }
    catch (err) {
        next(createHttpError(401, err));
    }
}));
storageRouter.get('/deleteAllButtons', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield wcagButtons.deleteJson();
        const responseMessage = "Deleted all JSON data in buttons_test table";
        res.send({ message: responseMessage });
    }
    catch (err) {
        next(createHttpError(401, err));
    }
}));
