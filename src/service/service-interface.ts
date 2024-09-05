import IUser, { ILocation } from '../model/user/userinterface';

export default interface IUserService {
    createUser(data: CreateUserDTO): Promise<IUser | null>;
    login(data: LoginUserDTO): Promise<IUser | null>;
    completegoogleuser(data:googleuserupdateDTO,userId:string):Promise<IUser | null>;
    completeuser(data:userupdateDTO,userId:string):Promise<IUser | null>
    forgetpassword(data: CreateUserDTO): Promise<{ message: string } | void>
    activatePassword(token: string, newPassword: string): Promise<{ message: string }>
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