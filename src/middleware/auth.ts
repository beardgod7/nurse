import { Request, Response ,NextFunction } from "express";
import User from "../model/user/user";
import ErrorHandler from "../utils/Errorhandler";
import jwt, { JwtPayload } from 'jsonwebtoken'

class Auth {
    isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
      const { token } = req.cookies;
  
      if (!token) {
        return next(new ErrorHandler('Please login to continue', 401));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
      console.log(decoded)
      if (!decoded._id) {
        return next(new ErrorHandler('Invalid token. Please log in again.', 401));
      }
      const user = await User.findById(decoded._id);
  
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }
      req.user = user;
  
      next();
    };
  }

  export default Auth