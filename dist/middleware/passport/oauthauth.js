"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Authmiddlware {
    constructor() {
        this.isAuthenticated = (req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }
            res.status(401).json({ message: 'Unauthorized' });
        };
    }
}
exports.default = Authmiddlware;
