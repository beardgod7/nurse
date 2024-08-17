"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    static isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isPasswordStrong(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$#!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    static isFieldNotEmpty(field) {
        return field.trim().length > 0;
    }
}
exports.default = Validator;
