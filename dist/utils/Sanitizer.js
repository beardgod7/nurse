"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sanitizer {
    static sanitizeEmail(email) {
        return email.trim().toLowerCase();
    }
    static sanitizeTextField(field) {
        return field.trim();
    }
    static sanitizePassword(password) {
        return password.trim();
    }
    static sanitizeName(firstName) {
        return firstName.trim();
    }
    static sanitizeGender(Gender) {
        return Gender.trim();
    }
}
exports.default = Sanitizer;
