import User from '../model/user/user_pg';
import jwt from 'jsonwebtoken';
import IUser from '../model/user/userinterface';
import Validator from '../utils/Validator';
import Sanitizer from '../utils/Sanitizer';
import TokenService from '../utils/Jwtoken';
import Userhash from '../utils/bcrypt';
import ErrorHandler from '../utils/Errorhandler';
import Mailer from '../utils/mail';
import IUserService, { CreateUserDTO, googleuserupdateDTO, LoginUserDTO, userupdateDTO } from './service-interface';


  class UserService implements IUserService {
    private userModel:typeof User 
    constructor(userModel: typeof User) { 
      this.userModel = userModel;
    }
  
    async createUser(data: CreateUserDTO): Promise<IUser | null> {
      const { email, password } = data;
  
      const sanitizedEmail = Sanitizer.sanitizeEmail(email);
      const sanitizedPassword = Sanitizer.sanitizePassword(password);
  
      if (!Validator.isEmailValid(sanitizedEmail)) {
        throw new ErrorHandler('Invalid email address.',400);
      }
  
      if (!Validator.isPasswordStrong(sanitizedPassword)) {
        throw new ErrorHandler('Password is not strong enough.',400);
      }
  
      
      const existingUser = await this.userModel.findOne({ where: { email: sanitizedEmail } });
      if (existingUser) {
        throw new ErrorHandler('user already exist',400);
      }
      const newUser = new this.userModel({
        email: sanitizedEmail,
        password: sanitizedPassword, 
         role: 'client',
         ProfileComplete:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      await newUser.save();
      return newUser;
    }
  
    async login(data: LoginUserDTO): Promise<IUser | null> {
      const { email, password } = data;
  
     
      const sanitizedEmail = Sanitizer.sanitizeEmail(email);
      const sanitizedPassword = Sanitizer.sanitizePassword(password);
  
      if (!Validator.isEmailValid(sanitizedEmail)) {
        throw new ErrorHandler('Invalid email address.',400);
      }
  
      
      const user = await this.userModel.findOne({where:{ email: sanitizedEmail }});
      if (!user) {
        throw new ErrorHandler('user doesnt exist.',401); 
      }
  
      const isMatch = await Userhash.comparePassword(user,sanitizedPassword);
      if (!isMatch) {
        throw new ErrorHandler('password is invalid',401);
      }
      const token = TokenService.generateAuthToken(user);
      return user
    }

    async  completegoogleuser(data: googleuserupdateDTO, userId: string): Promise<IUser | null> {
      const updatedData: Partial<IUser> = {};
  
      if (data.firstName) {
        updatedData.firstName = Sanitizer.sanitizeName(data.firstName);
      }
      if (data.lastName) {
        updatedData.lastName = Sanitizer.sanitizeName(data.lastName);
      }
      if (data.gender) {
        updatedData.gender = Sanitizer.sanitizeGender(data.gender);
      }
      if (data.phoneNumber) {
        updatedData.phoneNumber = data.phoneNumber; 
      }
      if (data.location) {
        updatedData.location = data.location; 
      }
      updatedData.ProfileComplete = true;
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new ErrorHandler('user not found',401);
      }
      await user.update(updatedData);
      return user;
    }
    
    async  completeuser(data: userupdateDTO, userId: string): Promise<IUser | null> {
      const updatedData: Partial<IUser> = {};
      if (data.firstName) {
        updatedData.firstName = Sanitizer.sanitizeName(data.firstName);
      }
      if (data.lastName) {
        updatedData.lastName = Sanitizer.sanitizeName(data.lastName);
      }
      if (data.gender) {
        updatedData.gender = Sanitizer.sanitizeGender(data.gender);
      }
      if (data.phoneNumber) {
        updatedData.phoneNumber = data.phoneNumber; 
      }
      if (data.location) {
        updatedData.location = data.location; 
      }
      updatedData.ProfileComplete = true;
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new ErrorHandler('user not found',401);
      }
      await user.update(updatedData);
      return user;
    }
    
    async forgetpassword(data: CreateUserDTO) : Promise<{ message: string } | void>{
      const { email} = data;
  
      const sanitizedEmail = Sanitizer.sanitizeEmail(email);
  
      if (!Validator.isEmailValid(sanitizedEmail)) {
        throw new ErrorHandler('Invalid email address.',400);
      }
      const User = await this.userModel.findOne({ where: { email: sanitizedEmail } });
      if (!User) {
        throw new ErrorHandler('user doesnt  exist',400);
      }
      const activationToken = TokenService.generateAuthToken(User);
      const activationUrl = `http://localhost:443/api/password-activation/${activationToken}`;
    
    try {
      await Mailer.sendMail({
        email: User.email,
        subject: "Activate your account",
        message: `Hello ${User.email}, please click on the link to activate your account: ${activationUrl}`,
      });
      return { message: 'Activation email sent successfully!' }
    } catch (error) {
      return new ErrorHandler('email wasnt sent', 500);
    }
    }

    async activatePassword(token: string, newPassword: string): Promise<{ message: string }> {
      
      const decoded = TokenService.verifyAuthToken(token);
      if (!decoded) {
        throw new ErrorHandler('Invalid or expired token.', 400);
      }
  
      const userId = decoded.id;

      const user = await this.userModel.findOne({ where: { id: userId } });
      if (!user) {
        throw new ErrorHandler('User not found.', 404);
      }
      const sanitizedPassword = Sanitizer.sanitizePassword(newPassword);
      if (!Validator.isPasswordStrong(sanitizedPassword)) {
        throw new ErrorHandler('Password is not strong enough.',400);
      }
      await user.update({ password: sanitizedPassword });
  
      return { message: 'Password updated successfully.' };
    }




  }
  
  export default UserService;
  


