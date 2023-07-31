"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server_error = exports.error_responder = void 0;
class server_error extends Error {
    constructor(statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
exports.server_error = server_error;
const error_responder = (err, _request, response, _next) => {
    if (response.statusCode === 200) {
        response.statusCode = 400;
    }
    console.log(err.message);
    response.header('Content-Type', 'application/json');
    response.json({ error: err.message, status: err.statusCode || 400 });
};
exports.error_responder = error_responder;
