import User from '../model/user/user';
import IUser from '../model/user/userinterface';
import Validator from '../utils/Validator';
import Sanitizer from '../utils/Sanitizer';
import TokenService from '../utils/Jwtoken';

export interface IUserService {
    createUser(data: CreateUserDTO): Promise<IUser | null>;
    login(data: LoginUserDTO): Promise<IUser | null>;
    completegoogleuser(data:googleuserupdateDTO,userId:string):Promise<IUser | null>
    
  }
  export interface googleuserupdateDTO {
    firstName:string,
    lastName:string,
    phoneNumber:number,
    gender:string,
    address:string,
    password:string,
  }
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
  
      
      const existingUser = await this.userModel.findOne({ email: sanitizedEmail });
      if (existingUser) {
        return null; 
      }
      const newUser = new this.userModel({
        email: sanitizedEmail,
        password: sanitizedPassword, 
         role: 'client',
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
  
      
      const user = await this.userModel.findOne({ email: sanitizedEmail });
      if (!user) {
        return null; 
      }
  
      const isMatch = await user.comparePassword(sanitizedPassword);
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
      if (data.password) {
        if (!Validator.isPasswordStrong(data.password)) {
          throw new Error('Password is not strong enough.');
        }
        updatedData.password = await Sanitizer.sanitizePassword(data.password);
      }
  
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, updatedData, { new: true });
      return updatedUser;
    } 

  }
  
  export default UserService;
  

  