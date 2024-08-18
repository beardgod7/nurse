import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import express, { Application } from 'express';
import app from './app/app'
import './middleware/passport/passport'


class server{
    private app:Application;
    private httpsPort:number;
    private httpPort:number;
    private sslKeyPath: string;
    private sslCertPath: string;
    constructor(app:Application,httpsPort:number=443,httpPort:number=80){
        this.app=app
        this.httpsPort=httpsPort
        this.httpPort=httpPort
        this.sslKeyPath = path.resolve(__dirname, '../server.key');
        this.sslCertPath = path.resolve(__dirname, '../server.cert');
    }

    private loadSSLCertificates() {
        const key = fs.readFileSync(this.sslKeyPath);
        const cert = fs.readFileSync(this.sslCertPath);
        return { key, cert };
    }

    public startHttpsServer() {
        const httpsOptions = this.loadSSLCertificates();

        https.createServer(httpsOptions, this.app).listen(this.httpsPort, () => {
            console.log(`HTTPS Server running on port ${this.httpsPort}`);
        });
    }

    public startHttpRedirectServer() {
        const httpApp = express();
        httpApp.get('*', (req, res) => {
            res.redirect(`https://${req.hostname}${req.url}`);
        });

        http.createServer(httpApp).listen(this.httpPort, () => {
            console.log(`HTTP Server running on port ${this.httpPort} (redirecting to HTTPS)`);
        });
    }

    public startServers() {
        this.startHttpsServer();
        this.startHttpRedirectServer();
    }

}

const servercon = new server(app);
servercon.startServers();