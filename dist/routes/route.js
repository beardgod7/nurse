"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controller/usercontroller"));
const userservice_1 = __importDefault(require("../service/userservice"));
const user_pg_1 = __importDefault(require("../model/user/user_pg"));
const auth_1 = __importDefault(require("../middleware/auth"));
const oauthauth_1 = __importDefault(require("../middleware/passport/oauthauth"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        const userService = new userservice_1.default(user_pg_1.default);
        this.userController = new usercontroller_1.default(userService);
        this.authMiddleware = new oauthauth_1.default();
        this.auth = new auth_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/create-users', this.userController.createUser);
        this.router.post('/login', this.userController.login);
        this.router.put('/Update', this.authMiddleware.isAuthenticated, this.userController.completegoogleuser);
        this.router.put('/update-user', this.auth.isAuthenticated, this.userController.completeuser);
        this.router.post('/forget-password', this.userController.forgetpassword);
        this.router.post('/password-activation/:token', this.userController.activatePassword);
        //test route for authmiddleware for google users in dev mode only frontend dont use
        this.router.get('/goodboy', this.authMiddleware.isAuthenticated, (req, res) => {
            res.send(`
          <html>
            <head><title>Good Boy</title></head>
            <body>
              <h1>Good boy</h1>
            </body>
          </html>
        `);
        });
    }
}
exports.default = new UserRouter().router;
