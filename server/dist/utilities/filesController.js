"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteImage = (filePath) => {
    if (!fs_1.default.existsSync(filePath)) {
        throw {
            message: ` image not found `,
            status: 404,
            error: new Error(),
        };
    }
    fs_1.default.unlink(filePath, (err) => {
        if (err)
            throw err;
    });
};
exports.deleteImage = deleteImage;
