import { Request, Response ,NextFunction} from 'express';
import IUserService, { googleuserupdateDTO, userupdateDTO } from '../service/userservice';  
import TokenService from '../utils/Jwtoken';
import ErrorHandler from '../utils/Errorhandler';
import IUser from '../model/user/userinterface';
import AuthService from '../utils/usertoken';



class UserController {
  private userService: IUserService;  

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await this.userService.createUser({ email, password });
      if (user) {
        const token = TokenService.generateAuthToken(user);
        
        AuthService.sendToken(user, 201, res);
      } 
    } catch (error) {
      console.error('Error creating user:', error);
      next(error)
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password", 400));
      }

      const user = await this.userService.login({ email, password });
        if (user) {
            AuthService.sendToken(user, 200, res);
      } 
    } catch (error) {
      console.error('Error during login:', error);
      next(error);
    }
  };

  
  public completegoogleuser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as IUser;
      const profileData: googleuserupdateDTO = req.body;

      if (!user || !user.id) {
        return next(new ErrorHandler('User not authenticated', 401));
      };
  
      const userId = user.id.toString();

      const updatedUser = await this.userService.completegoogleuser(profileData, userId);
      if (updatedUser) {
        res.status(200).json({ user: updatedUser });
      } 
    } catch (error) {
      console.error('Error completing profile:', error);
      next(error)
    }
  };

  public completeuser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as IUser;
      const profileData:userupdateDTO = req.body;

      if (!user || !user.id) {
        return next(new ErrorHandler('User not authenticated', 401));
      };
  
      const userId = user.id.toString();

      const updatedUser = await this.userService.completeuser(profileData, userId);
      if (updatedUser) {
        res.status(200).json({ user: updatedUser });
      } 
    } catch (error) {
      console.error('Error completing profile:', error);
      next(error)
      }  
    }

}

export default UserController;
