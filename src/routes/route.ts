import { Router } from 'express';
import UserController from '../controller/usercontroller';
import UserService from '../service/userservice';
import User from '../model/user/user';
import  IUserService from '../service/userservice'; 
class UserRouter {
   public router: Router;
   private userController: UserController;
  
    constructor() {
      this.router = Router();
      const userService: IUserService = new UserService(User);
      this.userController = new UserController(userService);
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post('/create-users',  this.userController.createUser);
      this.router.post('/login', this.userController.login);
    }
  }
  
  export default new UserRouter().router;
  