import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Router } from 'express';
import IUser from '../../model/user/userinterface';
import ErrorHandler from '../../utils/Errorhandler'
import AuthService from '../../utils/usertoken';

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
                passport.authenticate('google', { failureMessage: true }), 
                this.googleCallback
            );

            this.router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
                req.logout((error) => {
                    if (error) {
                        return next(new ErrorHandler("Logout failed", 500));
                    }
                    res.status(200).json({ message: "Logout successful" });
                });
            });
        } catch (error) {
            console.error(error);
            this.router.use((req: Request, res: Response) => {
                res.status(500).json({ message: 'Internal server error' }); 
            });
        }
    }
    public googleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (req.user) {
            const user = req.user as IUser;
            if (user.ProfileComplete) {
                res.redirect('https://nurseapp.netlify.app/homepage');
            } else {
                res.redirect('https://nurseapp.netlify.app/update');
            }
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    };
}

export default new Passportroute().router;