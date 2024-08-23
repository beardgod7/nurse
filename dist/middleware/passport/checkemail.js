"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../model/user/user"));
class CheckExistingUser {
    static async checkExistingUser(req, res, next) {
        try {
            const user = req.user;
            console.log('CheckExistingUser middleware executed');
            console.log('req.user:', req.user);
            const existingUser = await user_1.default.findOne({
                email: user.email,
                googleId: { $exists: false }
            });
            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already registered without Google OAuth. Please log in manually.'
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CheckExistingUser;
