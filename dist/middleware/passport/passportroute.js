"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
class Passportroute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routerinit();
    }
    async routerinit() {
        try {
            this.router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
            this.router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
                res.send('user reg successful');
            });
            this.router.get('/logout', (req, res, next) => {
                req.logout((error) => {
                    if (error) {
                        return next(error);
                    }
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
