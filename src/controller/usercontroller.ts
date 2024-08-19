import { Request, Response ,NextFunction} from 'express';
import IUserService, { googleuserupdateDTO } from '../service/userservice';  
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
        //res.status(201).json({ user, token });
        AuthService.sendToken(user, 201, res);
      } else {
        next(new ErrorHandler("User already exists", 400));
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return next(new ErrorHandler("Error creating user", 500));
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
      } else {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
    } catch (error) {
      console.error('Error during login:', error);
      return next(new ErrorHandler("Login failed", 500));
    }
  };

  
  public completegoogleuser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as IUser;
      const profileData: googleuserupdateDTO = req.body;

      if (!user || !user._id) {
        return next(new ErrorHandler('User not authenticated', 401));
      };
  
      const userId = user._id.toString();

      const updatedUser = await this.userService.completegoogleuser(profileData, userId);
      if (updatedUser) {
        res.status(200).json({ user: updatedUser });
      } else {
        next(new ErrorHandler('Profile completion failed', 400));
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      return next(new ErrorHandler('Profile completion failed', 500));
    }
  };
}

export default UserController;
