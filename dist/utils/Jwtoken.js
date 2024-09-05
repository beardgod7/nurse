"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    static generateAuthToken(user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return token;
    }
    static verifyAuthToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = TokenService;
