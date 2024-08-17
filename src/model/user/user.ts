import mongoose, { Schema } from 'mongoose';
import IUser from './userinterface';
import UserHash from '../../utils/bcrypt';

class UserSchemaClass {
    public schema: Schema;

    constructor() {
        this.schema = new Schema<IUser>({
            googleId: {
                type: String,
                unique: true,
                sparse:true
            },
            
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            phoneNumber: {
                type: String,
            },
            password: {
                type: String,
                minlength: 5,
            },
            role: {
                type: String,
                enum: ['client'],
                required: true,
            },
            location: {
                type: {
                    type: String,
                    enum: ['Point'],
                    default: 'Point',
                },
                coordinates: {
                    type: [Number],
                    index: '2dsphere',
                },
                address: {
                    type: String,
                },
            },
            chats: [{
                nurse: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Nurse',
                    required: true,
                },
                messages: [{
                    sender: {
                        type: mongoose.Schema.Types.ObjectId,
                        refPath: 'senderModel',
                        required: true,
                    },
                    text: {
                        type: String,
                        required: true,
                    },
                    timestamp: {
                        type: Date,
                        default: Date.now,
                    },
                }],
            }],
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            },    
        });

        this.schema.pre('save', async function (next) {
            if (this.isModified('password')) {
                if (typeof this.password === 'string') {
                    this.password = await UserHash.hashPassword(this.password);
                }
            }
            next();
        });

        this.schema.methods.comparePassword = async function (candidatePassword: string) {
            if (typeof this.password === 'string') {
                return await UserHash.comparePassword(this.password, candidatePassword);
            }
            throw new Error('Password is not defined');
        };
    }
} 
const userSchemaClass = new UserSchemaClass();
const User = mongoose.model<IUser>('User', userSchemaClass.schema);

export default User;