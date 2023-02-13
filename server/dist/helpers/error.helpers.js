"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
function throwError(message, status) {
    throw {
        status,
        message,
    };
}
exports.throwError = throwError;
