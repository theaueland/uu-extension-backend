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
exports.deleteJson = exports.getJson = exports.postJson = exports.getSqlQuery = void 0;
const db = __importStar(require("../postgres/utils"));
const validButtonsTypeTest = (data) => {
    if (data.id === undefined) {
        return false;
    }
    if (data.name === undefined) {
        return false;
    }
    return true;
};
const validButtonsType = (data) => {
    if (data.htmlString === undefined) {
        return false;
    }
    if (data.correctText === undefined) {
        return false;
    }
    if (data.name === undefined) {
        return false;
    }
    if (data.comment === undefined) {
        return false;
    }
    if (data.checked === undefined) {
        return false;
    }
    if (data.url === undefined) {
        return false;
    }
    if (data.testID === undefined) {
        return false;
    }
    if (data.chromeVersion === undefined) {
        return false;
    }
    if (data.chromeExtensionVersion === undefined) {
        return false;
    }
    if (data.testID === undefined) {
        return false;
    }
    if (data.outcome === undefined) {
        return false;
    }
    return true;
};
const getSqlQuery = (query_type, data) => {
    const getJson = 'SELECT * FROM buttons_test;';
    const getAllJson = 'SELECT * FROM buttons_test';
    const postJson = `INSERT INTO buttons_test
                     VALUES(DEFAULT, '${JSON.stringify(data)}');`;
    const deleteAllJson = 'DELETE FROM buttons_test';
    switch (query_type) {
        case 'get': {
            return getJson;
        }
        case 'getAll': {
            return getAllJson;
        }
        case 'post': {
            return postJson;
        }
        case 'delete': {
            return deleteAllJson;
        }
        default: {
            throw new Error('query type not defined');
        }
    }
};
exports.getSqlQuery = getSqlQuery;
const postJson = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //if (!validButtonsType(data)) { throw new Error('invalid json format'); }
    //let object_data: Test = data;
    //if (!validButtonsTypeTest(object_data)) { throw new Error('invalid json format'); }
    yield db.query((0, exports.getSqlQuery)('post', JSON.stringify(data)));
});
exports.postJson = postJson;
const getJson = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.query((0, exports.getSqlQuery)('get'));
});
exports.getJson = getJson;
const deleteJson = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.query((0, exports.getSqlQuery)('delete'));
});
exports.deleteJson = deleteJson;
