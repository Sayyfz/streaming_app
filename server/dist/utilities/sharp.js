"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
async function resizeImage(file, width, height, path) {
    const poster_image = `${Date.now()}.jpg`;
    const output = `${path}/${poster_image}`;
    await (0, sharp_1.default)(file)
        .resize({
        width,
        height,
    })
        .toFormat("jpg")
        .toFile(output);
    return poster_image;
}
exports.default = resizeImage;
