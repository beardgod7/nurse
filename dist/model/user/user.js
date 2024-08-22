"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("../../utils/bcrypt"));
class UserSchemaClass {
    constructor() {
        this.schema = new mongoose_1.Schema({
            googleId: {
                type: String,
                unique: true,
                sparse: true
            },
            firstName: {
                type: String,
            },
            gender: {
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
                type: Number,
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
                        type: mongoose_1.default.Schema.Types.ObjectId,
                        ref: 'Nurse',
                        required: true,
                    },
                    messages: [{
                            sender: {
                                type: mongoose_1.default.Schema.Types.ObjectId,
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
                    this.password = await bcrypt_1.default.hashPassword(this.password);
                }
            }
            next();
        });
        this.schema.methods.comparePassword = async function (candidatePassword) {
            if (typeof this.password === 'string') {
                return await bcrypt_1.default.comparePassword(this.password, candidatePassword);
            }
            throw new Error('Password is not defined');
        };
    }
}
const userSchemaClass = new UserSchemaClass();
const User = mongoose_1.default.model('User', userSchemaClass.schema);
exports.default = User;
