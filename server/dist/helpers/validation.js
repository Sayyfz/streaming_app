"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_helpers_1 = require("./error.helpers");
class Validation {
    constructor(column) {
        this.column = column;
        this.key = Object.keys(this.column)[0];
        this.value = Object.values(this.column)[0];
    }
    required() {
        if (!this.value) {
            (0, error_helpers_1.throwError)(`${this.key} is required`, 422);
        }
        return this;
    }
    isEmail() {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.value.toString().match(validRegex) === null) {
            (0, error_helpers_1.throwError)(`pleast insert valid  Email`, 422);
        }
        return this;
    }
    passwordStrength(strong) {
        const strongRegex = strong
            ? strong
            : new RegExp("^(?=.*[a-z])(?=.*[0-9])");
        if (this.value.toString().match(strongRegex) === null) {
            (0, error_helpers_1.throwError)(`${this.key} must have numbers and characters`, 422);
        }
        return this;
    }
    min(num) {
        if (this.value.toString().length < num) {
            (0, error_helpers_1.throwError)(`${this.key} must be >= ${num}`, 422);
        }
        return this;
    }
    max(num) {
        if (this.value.toString().length > num) {
            (0, error_helpers_1.throwError)(`${this.key} must be <= ${num}`, 422);
        }
        return this;
    }
    range(max, min) {
        if (this.value > max || this.value < min) {
            (0, error_helpers_1.throwError)(`${this.key} must be between ${max} and ${min} `, 422);
        }
        return this;
    }
    isInt() {
        if (/^\d+$/.test(this.value))
            return this;
        (0, error_helpers_1.throwError)(`${this.key} should be integer`, 422);
    }
    isNum() {
        if (isNaN(+this.value)) {
            (0, error_helpers_1.throwError)(`${this.key} should be a valid number`, 422);
        }
        return this;
    }
    isNotEmpty() {
        if (this.value.toString().length == 0) {
            (0, error_helpers_1.throwError)(`Please add valid value to ${this.key} `, 422);
        }
        return this;
    }
    setColumn(col) {
        this.key = Object.keys(col)[0];
        this.value = Object.values(col)[0];
        return this;
    }
}
let instance;
exports.default = (column) => {
    if (!instance) {
        instance = new Validation(column);
    }
    return instance.setColumn(column);
};
