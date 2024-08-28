"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const Errorhandler_1 = __importDefault(require("../../utils/Errorhandler"));
class Passportroute {
    constructor() {
        this.googleCallback = async (req, res, next) => {
            if (req.user) {
                const user = req.user;
                if (user.ProfileComplete) {
                    res.redirect('https://nurseapp.netlify.app/homepage');
                }
                else {
                    res.redirect('https://nurseapp.netlify.app/update');
                }
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
            this.router.use((req, res) => {
                res.status(500).json({ message: 'Internal server error' });
            });
        }
    }
}
exports.default = new Passportroute().router;
