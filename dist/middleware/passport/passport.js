"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_pg_1 = __importDefault(require("../../model/user/user_pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class passportconfig {
    constructor() {
        this.clientID = process.env.clientID || "";
        this.clientSecret = process.env.clientSecret || "";
        this.callbackURL = process.env.callbackURL || "";
        this.connect();
    }
    async connect() {
        try {
            passport_1.default.use(new passport_google_oauth20_1.Strategy({
                clientID: this.clientID,
                clientSecret: this.clientSecret,
                callbackURL: this.callbackURL,
                scope: ['profile', 'email'],
            }, async (accessToken, refreshToken, profile, done) => {
                var _a, _b;
                const email = ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || '';
                const newUser = {
                    googleId: profile.id,
                    email: email,
                    role: 'client',
                    ProfileComplete: false,
                };
                try {
                    let user = await user_pg_1.default.findOne({ where: { email } });
                    if (user) {
                        if (!user.googleId) {
                            user.googleId = profile.id;
                            await user.save();
                            return done(null, user);
                        }
                        else {
                            return done(null, user);
                        }
                    }
                    else {
                        user = await user_pg_1.default.create(newUser);
                        return done(null, user);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }));
            passport_1.default.serializeUser((user, done) => {
                done(null, user.id);
            });
            passport_1.default.deserializeUser(async (id, done) => {
                try {
                    const user = await user_pg_1.default.findByPk(id);
                    done(null, user);
                }
                catch (err) {
                    done(err, null);
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new passportconfig();
