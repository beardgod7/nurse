import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import UserRouter from '../routes/route'; 
import passportroute from '../middleware/passport/passportroute'; 
import ErrorHandler from '../utils/Errorhandler'; 
import  connectivityistance  from '../utils/mongo_con'; 
import cors from 'cors'

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling(); 
  }

  private initializeMiddleware(): void {
    connectivityistance; 
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(session({
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 60 * 1000,
      }
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(cors)
  }

  private initializeRoutes(): void {
    this.app.use('/api', UserRouter);
    this.app.use('/auth', passportroute);
  }

  private initializeErrorHandling(): void {
    this.app.use((err:ErrorHandler, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
      });
    });
  }
}

export default new App().app;

