import { Request, Response ,NextFunction } from "express";


class Authmiddlware{
     isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
          return next();
        }
        res.status(401).json({ message: 'Unauthorized' });
      };
}

export default Authmiddlware