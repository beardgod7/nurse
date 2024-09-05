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
const mail_1 = __importDefault(require("../utils/mail"));
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
    async forgetpassword(data) {
        const { email } = data;
        const sanitizedEmail = Sanitizer_1.default.sanitizeEmail(email);
        if (!Validator_1.default.isEmailValid(sanitizedEmail)) {
            throw new Errorhandler_1.default('Invalid email address.', 400);
        }
        const User = await this.userModel.findOne({ where: { email: sanitizedEmail } });
        if (!User) {
            throw new Errorhandler_1.default('user doesnt  exist', 400);
        }
        const activationToken = Jwtoken_1.default.generateAuthToken(User);
        const activationUrl = `http://localhost:443/api/password-activation/${activationToken}`;
        try {
            await mail_1.default.sendMail({
                email: User.email,
                subject: "Activate your account",
                message: `Hello ${User.email}, please click on the link to activate your account: ${activationUrl}`,
            });
            return { message: 'Activation email sent successfully!' };
        }
        catch (error) {
            return new Errorhandler_1.default('email wasnt sent', 500);
        }
    }
    async activatePassword(token, newPassword) {
        const decoded = Jwtoken_1.default.verifyAuthToken(token);
        if (!decoded) {
            throw new Errorhandler_1.default('Invalid or expired token.', 400);
        }
        const userId = decoded.id;
        const user = await this.userModel.findOne({ where: { id: userId } });
        if (!user) {
            throw new Errorhandler_1.default('User not found.', 404);
        }
        const sanitizedPassword = Sanitizer_1.default.sanitizePassword(newPassword);
        if (!Validator_1.default.isPasswordStrong(sanitizedPassword)) {
            throw new Errorhandler_1.default('Password is not strong enough.', 400);
        }
        await user.update({ password: sanitizedPassword });
        return { message: 'Password updated successfully.' };
    }
}
exports.default = UserService;
