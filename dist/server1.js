"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app/app"));
require("./middleware/passport/passport");
class Server {
    constructor(app, httpPort = 80) {
        this.app = app;
        this.httpPort = httpPort;
    }
    startHttpServer() {
        http_1.default.createServer(this.app).listen(this.httpPort, () => {
            console.log(`HTTP Server running on port ${this.httpPort}`);
        });
    }
    startServers() {
        this.startHttpServer();
    }
}
const serverCon = new Server(app_1.default);
serverCon.startServers();
