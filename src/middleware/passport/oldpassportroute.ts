import {Request, Response ,NextFunction} from 'express'
import passport from 'passport'
import {Router} from 'express'
class Passportroute{
    public router:Router 
    constructor(){
        this.router=Router()
        this.routerinit()
    }
    async routerinit() {
        try {
            this.router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))
            this.router.get(
                '/google/callback',
                passport.authenticate('google', { failureRedirect: '/' }),
                (req:Request, res:Response) => {
                  res.send('user reg successful')
                }
              )
              this.router.get('/logout', (req:Request, res:Response, next:NextFunction) => {
                req.logout((error) => {
                    if (error) {return next(error)}
                    res.redirect('/')
                })
              })
        } catch (error) {
          console.error(error)  
        }
    }
    
}
export default new Passportroute().router