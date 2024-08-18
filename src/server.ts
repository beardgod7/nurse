import http from 'http';
import express, { Application } from 'express';
import app from './app/app';
import './middleware/passport/passport'
class Server {   
    private app: Application;
    private httpPort: number;

    constructor(app: Application, httpPort: number = 80) {
        this.app = app;
        this.httpPort = httpPort;
    }

    public startHttpServer() {
        http.createServer(this.app).listen(this.httpPort, () => {
            console.log(`HTTP Server running on port ${this.httpPort}`);
        });
    }

    public startServers() {
        this.startHttpServer();
    }
}

const serverCon = new Server(app);
serverCon.startServers();
