export default interface UserAttributes {
    id: number;
    googleId?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    gender?: string;
    phoneNumber?: number;
    password?: string;
    role: 'client';
    location?: ILocation;
    ProfileComplete:boolean
    createdAt: Date;
    updatedAt: Date;
    comparePassword?: (password:String) => Promise<boolean>
}  
export interface ILocation{
    location?: {
        type: string;
        coordinates: number[];
        address?: string;
      };
}