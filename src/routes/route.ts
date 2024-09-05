import { Router } from 'express';
import UserController from '../controller/usercontroller';
import UserService from '../service/userservice';
import User from '../model/user/user_pg'; 
import Auth from '../middleware/auth'
import  AuthMiddleware  from '../middleware/passport/oauthauth';
import {Request, Response } from 'express';
import IUserService from '../service/service-interface';

class UserRouter {
   public router: Router;
   private userController: UserController;
   private authMiddleware: AuthMiddleware;
   private auth:Auth
  
    constructor() {
      this.router = Router();
      const userService: IUserService = new UserService(User);
      this.userController = new UserController(userService);
      this.authMiddleware = new AuthMiddleware()
      this.auth=new Auth()
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.post('/create-users',  this.userController.createUser);
      this.router.post('/login', this.userController.login);
      this.router.put('/Update', this.authMiddleware.isAuthenticated,this.userController.completegoogleuser);
      this.router.put('/update-user', this.auth.isAuthenticated,this.userController.completeuser)
      this.router.post('/forget-password', this.userController.forgetpassword);
      this.router.post('/password-activation/:token', this.userController.activatePassword);
      //test route for authmiddleware for google users in dev mode only frontend dont use
      this.router.get('/goodboy', this.authMiddleware.isAuthenticated,(req: Request, res: Response) => {
        res.send(`
          <html>
            <head><title>Good Boy</title></head>
            <body>
              <h1>Good boy</h1>
            </body>
          </html>
        `);
      });
    }
  }
  
  export default new UserRouter().router;


  
  