import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../../model/user/user_pg";
import dotenv from "dotenv"


  interface IUpdate {
    id: string;
    googleId?: string;
  }


dotenv.config()

class passportconfig {
  private clientID: string;
  private clientSecret: string;
  private callbackURL: string;
  
  constructor() {
    this.clientID = process.env.clientID || "";
    this.clientSecret = process.env.clientSecret || "";
    this.callbackURL = process.env.callbackURL || "";
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      passport.use(
        new GoogleStrategy(
          {
            clientID: this.clientID,
            clientSecret: this.clientSecret,
            callbackURL: this.callbackURL,
            scope: ['profile', 'email'],
          },
          async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails?.[0]?.value || '';
            const newUser = {
              googleId: profile.id,
              email: email,
              role: 'client' as const, 
            };
            try {
              let user = await User.findOne({ where: { email } });
              if (user) {
                if (!user.googleId) {
                  user.googleId = profile.id;
                  await user.save();
                  return done(null, user);
                } else {
                  return done(null, user);
                }
              } else {
                user = await User.create(newUser); 
                return done(null, user);
              } 
            } catch (err) {
              console.error(err);
            }
          }
        )
      );

      passport.serializeUser((user: any, done) => {  
        done(null, user.id);  
      });

      passport.deserializeUser(async (id: string | number, done) => {
        try {
          const user = await User.findByPk(id);  
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new passportconfig();
