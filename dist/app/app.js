"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_con_1 = __importDefault(require("../utils/mongo_con"));
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
require("../middleware/passport/passport");
const express_session_1 = __importDefault(require("express-session"));
const passportroute_1 = __importDefault(require("../middleware/passport/passportroute"));
const route_1 = __importDefault(require("../routes/route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.initializeRoutes();
    }
    initializeMiddleware() {
        mongo_con_1.default;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || '',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 60 * 60 * 1000
            }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    initializeRoutes() {
        this.app.use('/api', route_1.default);
        this.app.use('/auth', passportroute_1.default);
    }
}
exports.default = new App().app;
