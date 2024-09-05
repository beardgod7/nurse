import nodemailer, { Transporter } from 'nodemailer';
import ErrorHandler from './Errorhandler';
import dotenv from "dotenv"

dotenv.config()

interface IMailOptions {
    email: string;
    subject: string;
    message: string;
}

export class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
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

    public async sendMail(options: IMailOptions): Promise<void> {
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            throw new ErrorHandler('email server error',404)
        }
    }
}
const Mailer= new MailService()
export default Mailer

