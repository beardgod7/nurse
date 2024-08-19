"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app/app"));
require("./middleware/passport/passport");
class server {
    constructor(app, httpsPort = 443, httpPort = 80) {
        this.app = app;
        this.httpsPort = httpsPort;
        this.httpPort = httpPort;
        this.sslKeyPath = path_1.default.resolve(__dirname, '../server.key');
        this.sslCertPath = path_1.default.resolve(__dirname, '../server.cert');
    }
    loadSSLCertificates() {
        const key = fs_1.default.readFileSync(this.sslKeyPath);
        const cert = fs_1.default.readFileSync(this.sslCertPath);
        return { key, cert };
    }
    startHttpsServer() {
        const httpsOptions = this.loadSSLCertificates();
        https_1.default.createServer(httpsOptions, this.app).listen(this.httpsPort, () => {
            console.log(`HTTPS Server running on port ${this.httpsPort}`);
        });
    }
    startHttpRedirectServer() {
        const httpApp = (0, express_1.default)();
        httpApp.get('*', (req, res) => {
            res.redirect(`https://${req.hostname}${req.url}`);
        });
        http_1.default.createServer(httpApp).listen(this.httpPort, () => {
            console.log(`HTTP Server running on port ${this.httpPort} (redirecting to HTTPS)`);
        });
    }
    startServers() {
        this.startHttpsServer();
        this.startHttpRedirectServer();
    }
}
const servercon = new server(app_1.default);
servercon.startServers();
