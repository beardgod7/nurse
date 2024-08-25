"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Userhash {
    static async hashPassword(user) {
        if (user.changed('password')) {
            user.password = await bcryptjs_1.default.hash(user.password, 10); // Add `!` to ensure password is not undefined
        }
    }
    static async comparePassword(user, password) {
        if (!user.password) {
            throw new Error('User password is not set.');
        }
        return bcryptjs_1.default.compare(password, user.password);
    }
}
exports.default = Userhash;
