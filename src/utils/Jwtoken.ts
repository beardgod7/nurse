import jwt from 'jsonwebtoken';
import IUser from '../model/user/userinterface';

class TokenService {
  static generateAuthToken(user:IUser): string {
    const token = jwt.sign(
      { id: user._id, email: user.email},
      process.env.JWT_SECRET as string,  
      {
        expiresIn: '1d',
      }
    );
    return token;
  }
}




export default TokenService;