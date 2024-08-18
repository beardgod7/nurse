"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const Jwtoken_1 = __importDefault(require("../utils/Jwtoken"));
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
class Passportroute {
    constructor() {
        this.googleCallback = async (req, res, next) => {
            if (req.user) {
                const user = req.user;
                const token = Jwtoken_1.default.generateAuthToken(user);
                res.status(200).json('auth successful');
            }
            else {
                next(new Errorhandler_1.default("Authentication failed", 401));
            }
        };
        this.router = (0, express_1.Router)();
        this.routerinit();
    }
    async routerinit() {
        try {
            this.router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
            this.router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), this.googleCallback);
            this.router.get('/logout', (req, res, next) => {
                req.logout((error) => {
                    if (error)
                        return next(error);
                    res.redirect('/');
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new Passportroute().router;
