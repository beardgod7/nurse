import User from "../../model/user/user";
import IUser from "../../model/user/userinterface";
import { Request, Response, NextFunction } from 'express';


class CheckExistingUser {
    public static async checkExistingUser(req: Request, res: Response, next: NextFunction) {
        try {

            const user = req.user as IUser;
            console.log('CheckExistingUser middleware executed');
            console.log('req.user:', req.user);
            const existingUser = await User.findOne({
                email: user.email,
                googleId: { $exists: false } 
            });
            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already registered without Google OAuth. Please log in manually.'
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default CheckExistingUser;

