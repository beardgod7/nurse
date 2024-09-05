"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const route_1 = __importDefault(require("../routes/route"));
const passportroute_1 = __importDefault(require("../middleware/passport/passportroute"));
const pg_connect_1 = __importDefault(require("../middleware/pg_connect"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddleware() {
        pg_connect_1.default.syncDatabase();
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:5173',
            credentials: true,
        }));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || '',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 6 * 60 * 1000,
                secure: process.env.NODE_ENV === 'production',
            }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    initializeRoutes() {
        this.app.use('/api', route_1.default);
        this.app.use('/auth', passportroute_1.default);
    }
    initializeErrorHandling() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || 'Internal Server Error',
            });
        });
    }
}
exports.default = new App().app;
