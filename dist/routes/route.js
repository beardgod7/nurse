"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const userservice_1 = __importDefault(require("../service/userservice"));
const user_1 = __importDefault(require("../model/user/user"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const userService = new userservice_1.default(user_1.default);
        this.userController = new usercontroller_1.default(userService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create-users', this.userController.createUser);
        this.router.post('/login', this.userController.login);
    }
}
exports.default = new UserRouter().router;
