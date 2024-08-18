import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../../model/user/user";
import dotenv from "dotenv"

dotenv.config()
class passportconfig{
    private clientID:string;
    private clientSecret:string
    private  callbackURL:string
    constructor(){
        this.clientID=process.env.clientID || ""
        this.clientSecret=process.env.clientSecret|| ""
        this.callbackURL=process.env.callbackUrl || ""
        this.connect()
    }

    
   private async connect():Promise<void>{
        try {
            
            passport.use(
                new GoogleStrategy(
                  {
                    clientID:this.clientID,
                    clientSecret: this.clientSecret,
                    callbackURL: this.callbackURL,
                    scope: ['profile', 'email'],
                  },
                  async (accessToken, refreshToken, profile, done) => {
                    const newUser = {
                      googleId: profile.id,
                      email: profile.emails?.[0]?.value || '', 
                      role: 'client',
                    }
                    try {
                      let user = await User.findOne({ googleId: profile.id })
                      if (user) {
                        done(null, user)
                      } else {
                        user = await User.create(newUser)
                        done(null, user)
                      }
                    } catch (err) {
                      console.error(err)
                    }
                  }
                )
              )
              
              passport.serializeUser((user: any, done) => {
                done(null, user._id);
              });
              
              passport.deserializeUser(async (id, done) => {
                try {
                  const user = await User.findById(id);
                  done(null, user);
                } catch (err) {
                  done(err, null);
                }
              });  
        } catch (error) {
            console.error(error )
        }
    }
    
}

export default new passportconfig()
