"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserHash {
    static async hashPassword(password) {
        return await bcryptjs_1.default.hash(password, 10);
    }
    static async comparePassword(Password, candidatePassword) {
        try {
            return await bcryptjs_1.default.compare(candidatePassword, Password);
        }
        catch (error) {
            throw new Error('Password comparison failed');
        }
    }
}
exports.default = UserHash;
