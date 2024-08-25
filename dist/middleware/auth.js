"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_pg_1 = __importDefault(require("../model/user/user_pg"));
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor() {
        this.isAuthenticated = async (req, res, next) => {
            const { token } = req.cookies;
            if (!token) {
                return next(new Errorhandler_1.default('Please login to continue', 401));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
            console.log(decoded);
            if (!decoded.id) {
                return next(new Errorhandler_1.default('Invalid token. Please log in again.', 401));
            }
            const user = await user_pg_1.default.findByPk(decoded.id);
            if (!user) {
                return next(new Errorhandler_1.default('User not found', 404));
            }
            req.user = user;
            next();
        };
    }
}
exports.default = Auth;
