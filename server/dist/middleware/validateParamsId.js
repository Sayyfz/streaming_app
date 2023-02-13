"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamsId = void 0;
const validateParamsId = (req, res, next) => {
    if (isNaN(+req.params.id)) {
        return res.status(400).json(`Please specify a valid id`);
    }
    next();
};
exports.validateParamsId = validateParamsId;
exports.default = exports.validateParamsId;
