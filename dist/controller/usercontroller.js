"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwtoken_1 = __importDefault(require("../utils/Jwtoken"));
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
const usertoken_1 = __importDefault(require("../utils/usertoken"));
class UserController {
    constructor(userService) {
        this.createUser = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const user = await this.userService.createUser({ email, password });
                if (user) {
                    const token = Jwtoken_1.default.generateAuthToken(user);
                    usertoken_1.default.sendToken(user, 201, res);
                }
            }
            catch (error) {
                console.error('Error creating user:', error);
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(new Errorhandler_1.default("Please provide both email and password", 400));
                }
                const user = await this.userService.login({ email, password });
                if (user) {
                    usertoken_1.default.sendToken(user, 200, res);
                }
            }
            catch (error) {
                console.error('Error during login:', error);
                next(error);
            }
        };
        this.completegoogleuser = async (req, res, next) => {
            try {
                const user = req.user;
                const profileData = req.body;
                if (!user || !user.id) {
                    return next(new Errorhandler_1.default('User not authenticated', 401));
                }
                ;
                const userId = user.id.toString();
                const updatedUser = await this.userService.completegoogleuser(profileData, userId);
                if (updatedUser) {
                    res.status(200).json({ user: updatedUser });
                }
            }
            catch (error) {
                console.error('Error completing profile:', error);
                next(error);
            }
        };
        this.completeuser = async (req, res, next) => {
            try {
                const user = req.user;
                const profileData = req.body;
                if (!user || !user.id) {
                    return next(new Errorhandler_1.default('User not authenticated', 401));
                }
                ;
                const userId = user.id.toString();
                const updatedUser = await this.userService.completeuser(profileData, userId);
                if (updatedUser) {
                    res.status(200).json({ user: updatedUser });
                }
            }
            catch (error) {
                console.error('Error completing profile:', error);
                next(error);
            }
        };
        this.userService = userService;
    }
}
exports.default = UserController;
