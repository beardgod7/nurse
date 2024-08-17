"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwtoken_1 = __importDefault(require("../utils/Jwtoken"));
class AuthService {
    static sendToken(user, statusCode, res) {
        const token = Jwtoken_1.default.generateAuthToken(user);
        const options = {
            expires: new Date(Date.now() + 90 * 12 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: false,
        };
        res.cookie("token", token, options).status(statusCode).json({
            success: true,
            user,
            token,
        });
    }
}
exports.default = AuthService;
