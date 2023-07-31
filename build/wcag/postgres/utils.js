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
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const initClient_1 = require("./initClient");
const query = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const dbClient = (0, initClient_1.initClient)();
    if (dbClient) {
        try {
            yield dbClient.connect();
            yield dbClient.query(query);
        }
        catch (error) {
            throw new Error('Failed to execute database query');
        }
        finally {
            yield dbClient.end();
        }
    }
    else {
        console.log('failed to connect to database');
        throw new Error('Failed to connect to database');
    }
});
exports.query = query;
