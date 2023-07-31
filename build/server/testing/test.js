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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run_test = void 0;
const axios_1 = __importDefault(require("axios"));
const post = (url, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = yield axios_1.default.post(url, req, config);
        console.log("\n(client: send_post) Response from post request: ", res.data);
    }
    catch (e) {
        if (axios_1.default.isAxiosError(e) && e.response && e.response.data) {
            console.log(e.response.data);
        }
    }
});
const post_object = () => __awaiter(void 0, void 0, void 0, function* () {
    const data_object = {
        htmlString: "html string",
        correctText: "correct test",
        name: "name",
        comment: "comment",
        checked: true,
        url: "url",
        testID: "id",
        chromeVersion: null,
        chromeExtensionVersion: null,
        outcome: "outcome"
    };
    post('http://localhost:8080/storage/saveButtons', JSON.stringify(data_object));
});
const post_json = () => __awaiter(void 0, void 0, void 0, function* () {
    const json_data = JSON.stringify({ name: 'insert JSON data here' });
    //const json_data = JSON.stringify({
    //htmlString: "html string",
    //correctText: "correct test",
    //name: "name",
    //comment: "comment",
    //checked: true,
    //url: "url",
    //testID: "id",
    //chromeVersion : null,
    //chromeExtensionVersion: null,
    //outcome: "outcome"
    //});
    post('http://localhost:8080/storage/saveButtons', json_data);
});
const get = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get('http://localhost:8080/storage/buttons');
        console.log("(client: send_get) Response from get request: ", res.data);
    }
    catch (e) {
        if (axios_1.default.isAxiosError(e) && e.response && e.response.data) {
            console.log(e.response.data);
        }
    }
});
// ----------------------------------------------------------------------------
const run_test = (run) => {
    switch (run) {
        case 'post_json': {
            post_json();
            break;
        }
        case 'post_object': {
            post_object();
            break;
        }
        case 'get': {
            get();
            break;
        }
        default: {
            return "";
        }
    }
};
exports.run_test = run_test;
