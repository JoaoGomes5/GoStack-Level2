import { getRepository } from "typeorm";
import User from '../models/User';
import { hash , compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/Auth';
import AppError from '../errors/AppError';
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
        throw new AppError("Incorrect email/password combination.", 401);
      }

      const passwordMathed = await compare(password, user.password );
      
      if(!passwordMathed){
        throw new AppError("Incorrect email/password combination.", 401);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, '790ade87f9771c382f30379f52517aab' , {
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