import { getRepository } from "typeorm";
import User from '../models/User';
import { hash , compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/Auth';
interface Request {
  email:string,
  password: string
}
interface Response {
  user: User
  token: string,
}


class AuthenticateUserService {
  public async execute({email, password}: Request) : Promise<Response>{
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({ where: {email} });

      if(!user){
        throw new Error("Incorrect email/password combination.");
      }

      const passwordMathed = await compare(password, user.password );
      
      if(!passwordMathed){
        throw new Error("Incorrect email/password combination.");
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret , {
        subject: user.id,
        expiresIn,
      });
      
      return {
        user,
        token
      }
  }
}

export default AuthenticateUserService;