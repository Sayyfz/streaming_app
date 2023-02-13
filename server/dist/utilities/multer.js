"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|)$/)) {
            return cb(new Error("upload png"));
        }
        cb(null, true);
    },
});
exports.default = upload;
