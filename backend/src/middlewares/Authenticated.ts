import {Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/Auth';


interface tokenPayload {
  iat: number,
  exp: number,
  sub: string
}

export default function ensureAuthenticated(request : Request, response: Response , next: NextFunction) : void {
  
    const authHeader= request.headers.authorization;

    if(!authHeader) {
      throw new Error("WT token is missing");
    }

    const [, token] = authHeader.split(' ');

    try{
      const decoded  = verify(token, authConfig.jwt.secret);

      const { sub} = decoded as tokenPayload;

      request.user = {
        id: sub
      }
       
      
      return next();
    }catch (err) {
      throw new Error("indalid JWT token");
      
    }
  
  
  }