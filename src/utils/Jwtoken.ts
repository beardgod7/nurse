import jwt, { JwtPayload } from 'jsonwebtoken';
import IUser from '../model/user/userinterface';

class TokenService {
  static generateAuthToken(user:IUser): string {
    const token = jwt.sign(
      { id: user.id, email: user.email},
      process.env.JWT_SECRET as string,  
      {
        expiresIn: '1d',
      }
    );
    return token;
  }

  static verifyAuthToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}




export default TokenService;