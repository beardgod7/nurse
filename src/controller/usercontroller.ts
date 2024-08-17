import { Request, Response ,NextFunction} from 'express';
import IUserService from '../service/userservice';  
import TokenService from '../utils/Jwtoken';
import ErrorHandler from '../utils/Errorhandler';

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
        res.status(201).json({ user, token });
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

      const result = await this.userService.login({ email, password });
      if (result) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
    } catch (error) {
      console.error('Error during login:', error);
      return next(new ErrorHandler("Login failed", 500));
    }
  };
}

export default UserController;
