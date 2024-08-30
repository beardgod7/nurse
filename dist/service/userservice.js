"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = __importDefault(require("../utils/Validator"));
const Sanitizer_1 = __importDefault(require("../utils/Sanitizer"));
const Jwtoken_1 = __importDefault(require("../utils/Jwtoken"));
const bcrypt_1 = __importDefault(require("../utils/bcrypt"));
const Errorhandler_1 = __importDefault(require("../utils/Errorhandler"));
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(data) {
        const { email, password } = data;
        const sanitizedEmail = Sanitizer_1.default.sanitizeEmail(email);
        const sanitizedPassword = Sanitizer_1.default.sanitizePassword(password);
        if (!Validator_1.default.isEmailValid(sanitizedEmail)) {
            throw new Errorhandler_1.default('Invalid email address.', 400);
        }
        if (!Validator_1.default.isPasswordStrong(sanitizedPassword)) {
            throw new Errorhandler_1.default('Password is not strong enough.', 400);
        }
        const existingUser = await this.userModel.findOne({ where: { email: sanitizedEmail } });
        if (existingUser) {
            throw new Errorhandler_1.default('user already exist', 400);
        }
        const newUser = new this.userModel({
            email: sanitizedEmail,
            password: sanitizedPassword,
            role: 'client',
            ProfileComplete: false,
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
            throw new Errorhandler_1.default('Invalid email address.', 400);
        }
        const user = await this.userModel.findOne({ where: { email: sanitizedEmail } });
        if (!user) {
            throw new Errorhandler_1.default('user doesnt exist.', 401);
        }
        const isMatch = await bcrypt_1.default.comparePassword(user, sanitizedPassword);
        if (!isMatch) {
            throw new Errorhandler_1.default('password is invalid', 401);
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
        updatedData.ProfileComplete = true;
        const user = await this.userModel.findByPk(userId);
        if (!user) {
            throw new Errorhandler_1.default('user not found', 401);
        }
        await user.update(updatedData);
        return user;
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
        updatedData.ProfileComplete = true;
        const user = await this.userModel.findByPk(userId);
        if (!user) {
            throw new Errorhandler_1.default('user not found', 401);
        }
        await user.update(updatedData);
        return user;
    }
}
exports.default = UserService;
