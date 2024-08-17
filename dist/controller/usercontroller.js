"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwtoken_1 = __importDefault(require("../utils/Jwtoken"));
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
class UserController {
    constructor(userService) {
        this.createUser = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const user = await this.userService.createUser({ email, password });
                if (user) {
                    const token = Jwtoken_1.default.generateAuthToken(user);
                    res.status(201).json({ user, token });
                }
                else {
                    next(new Errorhandler_1.default("User already exists", 400));
                }
            }
            catch (error) {
                console.error('Error creating user:', error);
                return next(new Errorhandler_1.default("Error creating user", 500));
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(new Errorhandler_1.default("Please provide both email and password", 400));
                }
                const result = await this.userService.login({ email, password });
                if (result) {
                    res.status(200).json({ message: 'Login successful' });
                }
                else {
                    return next(new Errorhandler_1.default("Invalid email or password", 400));
                }
            }
            catch (error) {
                console.error('Error during login:', error);
                return next(new Errorhandler_1.default("Login failed", 500));
            }
        };
        this.userService = userService;
    }
}
exports.default = UserController;
