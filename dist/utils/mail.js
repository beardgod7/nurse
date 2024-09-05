"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Errorhandler_1 = __importDefault(require("./Errorhandler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMPT_HOST,
            port: Number(process.env.SMPT_PORT),
            secure: false,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
        });
    }
    async sendMail(options) {
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        }
        catch (error) {
            throw new Errorhandler_1.default('email server error', 404);
        }
    }
}
exports.MailService = MailService;
const Mailer = new MailService();
exports.default = Mailer;
