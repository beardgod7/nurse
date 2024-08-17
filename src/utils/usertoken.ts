import { Response } from 'express';
import TokenService from '../utils/Jwtoken';
import IUser from '../model/user/userinterface';

class AuthService {
  static sendToken(user: IUser, statusCode: number, res: Response): void {
    const token = TokenService.generateAuthToken(user);
    
    
    const options = {
      expires: new Date(Date.now() + 90 * 12 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none" as const,
      secure: false, 
    };
    
    res.cookie("token", token, options).status(statusCode).json({
      success: true,
      user,
      token,
    });
  }
}

export default AuthService;