import connectivityistance from "../utils/mongo_con"
import passport from "passport";
import express, { Application} from 'express';
import '../middleware/passport/passport';
import session from "express-session";
import UserRouter from '../routes/route'
import passportroute from "../middleware/passport/passportroute";

class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware(): void {
        connectivityistance
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: process.env.SESSION_SECRET || '',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 30 * 60 * 1000 
              }
          }))
          this.app.use(passport.initialize());
          this.app.use(passport.session());
    }

    private initializeRoutes(): void {
        this.app.use('/api', UserRouter);
        this.app.use('/auth', passportroute)

    
    }
}

export default new App().app;
