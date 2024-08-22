"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const Errorhandler_1 = __importDefault(require("../../utils/Errorhandler"));
const usertoken_1 = __importDefault(require("../../utils/usertoken"));
class Passportroute {
    constructor() {
        this.googleCallback = async (req, res, next) => {
            if (req.user) {
                const user = req.user;
                const token = usertoken_1.default.sendToken(user, 201, res);
            }
            else {
                res.status(401).json({ message: "Authentication failed" });
            }
        };
        this.router = (0, express_1.Router)();
        this.routerinit();
    }
    async routerinit() {
        try {
            this.router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
            this.router.get('/google/callback', passport_1.default.authenticate('google', { failureMessage: true }), this.googleCallback);
            this.router.get('/logout', (req, res, next) => {
                req.logout((error) => {
                    if (error) {
                        return next(new Errorhandler_1.default("Logout failed", 500));
                    }
                    res.status(200).json({ message: "Logout successful" });
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new Passportroute().router;
