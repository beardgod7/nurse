"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = __importDefault(require("../utils/Validator"));
const Sanitizer_1 = __importDefault(require("../utils/Sanitizer"));
const Jwtoken_1 = __importDefault(require("../utils/Jwtoken"));
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(data) {
        const { email, password } = data;
        const sanitizedEmail = Sanitizer_1.default.sanitizeEmail(email);
        const sanitizedPassword = Sanitizer_1.default.sanitizePassword(password);
        if (!Validator_1.default.isEmailValid(sanitizedEmail)) {
            throw new Error('Invalid email address.');
        }
        if (!Validator_1.default.isPasswordStrong(sanitizedPassword)) {
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
    async login(data) {
        const { email, password } = data;
        const sanitizedEmail = Sanitizer_1.default.sanitizeEmail(email);
        const sanitizedPassword = Sanitizer_1.default.sanitizePassword(password);
        if (!Validator_1.default.isEmailValid(sanitizedEmail)) {
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
        const token = Jwtoken_1.default.generateAuthToken(user);
        return user;
    }
    async completegoogleuser(data, userId) {
        const updatedData = {};
        if (data.firstName) {
            updatedData.firstName = Sanitizer_1.default.sanitizeName(data.firstName);
        }
        if (data.lastName) {
            updatedData.lastName = Sanitizer_1.default.sanitizeName(data.lastName);
        }
        if (data.gender) {
            updatedData.gender = Sanitizer_1.default.sanitizeGender(data.gender);
        }
        if (data.phoneNumber) {
            updatedData.phoneNumber = data.phoneNumber;
        }
        if (data.location) {
            updatedData.location = data.location;
        }
        if (data.password) {
            if (!Validator_1.default.isPasswordStrong(data.password)) {
                throw new Error('Password is not strong enough.');
            }
            updatedData.password = await Sanitizer_1.default.sanitizePassword(data.password);
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updatedData, { new: true });
        return updatedUser;
    }
    async completeuser(data, userId) {
        const updatedData = {};
        if (data.firstName) {
            updatedData.firstName = Sanitizer_1.default.sanitizeName(data.firstName);
        }
        if (data.lastName) {
            updatedData.lastName = Sanitizer_1.default.sanitizeName(data.lastName);
        }
        if (data.gender) {
            updatedData.gender = Sanitizer_1.default.sanitizeGender(data.gender);
        }
        if (data.phoneNumber) {
            updatedData.phoneNumber = data.phoneNumber;
        }
        if (data.location) {
            updatedData.location = data.location;
        }
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updatedData, { new: true });
        return updatedUser;
    }
}
exports.default = UserService;
