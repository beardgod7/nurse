import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Router } from 'express';
import TokenService from '../utils/Jwtoken';
import IUser from '../model/user/userinterface';
import ErrorHandler from '../utils/Errorhandler';

class Passportroute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routerinit();
    }

    async routerinit() {
        try {
            
            this.router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

          
            this.router.get(
                '/google/callback',
                passport.authenticate('google', { failureRedirect: '/' }),
                this.googleCallback
            );
            this.router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
                req.logout((error) => {
                    if (error) return next(error);
                    res.redirect('/');
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    public googleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.user) {
            const user = req.user as IUser;
            const token = TokenService.generateAuthToken(user);
            res.status(200).json('auth successful');
        } else {
            next(new ErrorHandler("Authentication failed", 401));
        }
    };
}

export default new Passportroute().router;
