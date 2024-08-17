"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_1 = __importDefault(require("../model/user/user"));
class passportconfig {
    constructor() {
        this.clientID = process.env.clientID || "";
        this.clientSecret = process.env.clientService || "";
        this.callbackURL = process.env.callbackUrl || "";
        this.connect();
    }
    async connect() {
        try {
            passport_1.default.use(new passport_google_oauth20_1.Strategy({
                clientID: this.clientID,
                clientSecret: this.clientSecret,
                callbackURL: this.callbackURL
            }, async (accessToken, refreshToken, profile, done) => {
                var _a, _b, _c, _d;
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: ((_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName) || "",
                    lastName: ((_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName) || "",
                    image: ((_d = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || ""
                };
                try {
                    let user = await user_1.default.findOne({ googleId: profile.id });
                    if (user) {
                        done(null, user);
                    }
                    else {
                        user = await user_1.default.create(newUser);
                        done(null, user);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }));
            passport_1.default.serializeUser((user, done) => {
                done(null, user._id);
            });
            passport_1.default.deserializeUser(async (id, done) => {
                try {
                    const user = await user_1.default.findById(id);
                    done(null, user);
                }
                catch (err) {
                    done(err, null);
                }
            });
        }
        catch (error) {
        }
    }
}
//clientID:string,clientSecret:string,callbackURL:string,
