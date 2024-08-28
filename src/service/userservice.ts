import User from '../model/user/user_pg';
import IUser, { ILocation } from '../model/user/userinterface';
import Validator from '../utils/Validator';
import Sanitizer from '../utils/Sanitizer';
import TokenService from '../utils/Jwtoken';
import Userhash from '../utils/bcrypt';

export interface IUserService {
    createUser(data: CreateUserDTO): Promise<IUser | null>;
    login(data: LoginUserDTO): Promise<IUser | null>;
    completegoogleuser(data:googleuserupdateDTO,userId:string):Promise<IUser | null>;
    completeuser(data:userupdateDTO,userId:string):Promise<IUser | null>
    
  }
  export interface googleuserupdateDTO {
    firstName:string,
    lastName:string,
    phoneNumber:number,
    gender:string,
    location:ILocation,
    password:string,
  }
  export interface userupdateDTO extends googleuserupdateDTO{}
  export interface CreateUserDTO {
    email: string;
    password: string;
  }
 
  
  export interface LoginUserDTO {
    email: string;
    password: string;
  }

 
  
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
        throw new Error('Invalid email address.');
      }
  
      if (!Validator.isPasswordStrong(sanitizedPassword)) {
        throw new Error('Password is not strong enough.');
      }
  
      
      const existingUser = await this.userModel.findOne({ where: { email: sanitizedEmail } });
      if (existingUser) {
        return null; 
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
        throw new Error('Invalid email address.');
      }
  
      
      const user = await this.userModel.findOne({where:{ email: sanitizedEmail }});
      if (!user) {
        return null; 
      }
  
      const isMatch = await Userhash.comparePassword(user,sanitizedPassword);
      if (!isMatch) {
        return null; 
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
      if (data.password) {
        if (!Validator.isPasswordStrong(data.password)) {
          throw new Error('Password is not strong enough.');
        }
        updatedData.password = await Sanitizer.sanitizePassword(data.password);
      }
      updatedData.ProfileComplete = true;
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        return null;
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
        return null;
      }
      await user.update(updatedData);
      return user;
    } 

  }
  
  export default UserService;
  

  