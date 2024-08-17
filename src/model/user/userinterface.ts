import mongoose, { Document } from 'mongoose';

export default interface IUser extends Document {
    googleId?: string;  
    firstName?: string;  
    lastName?: string;   
    email: string;
    gender?:string
    phoneNumber?: string;  
    password?: string;
    role: 'client';  
    location?: ILocation; 
    chats?: IChat[];  
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}


interface ILocation {
    type: 'Point';
    coordinates: [number, number];
    address?: string;
}


interface IChat {
    nurse: mongoose.Schema.Types.ObjectId;  
    messages: IMessage[];
}
 interface IMessage {
    sender: mongoose.Schema.Types.ObjectId;
    text: string;
    timestamp: Date;
}