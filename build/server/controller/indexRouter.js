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
exports.indexRouter = void 0;
const express_1 = require("express");
const computedPropertiesService_1 = require("./computedPropertiesService");
const errorHandling_1 = require("../middleware/errorHandling");
const indexRouter = (0, express_1.Router)();
exports.indexRouter = indexRouter;
indexRouter.get('/', (_req, res) => {
    res.send({ message: "index page" });
});
indexRouter.get('/*', (_req, res) => {
    res.send({ message: "Endpoint does not exist" });
});
indexRouter.post('/computedProperties', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const computedProperties = yield (0, computedPropertiesService_1.retrieveComputedProperties)(url);
        // Respond to the client with JSON format containing computed properties
        res.json(computedProperties);
    }
    catch (error) {
        if (error instanceof errorHandling_1.server_error) {
            return (0, errorHandling_1.error_responder)(error, req, res);
        }
        else {
            console.error('An unexpected error occurred:', error);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
}));
