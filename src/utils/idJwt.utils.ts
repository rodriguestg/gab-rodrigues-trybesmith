import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'express-async-errors';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

export default (token: string): JwtPayload | string => {
  const data = jwt.verify(token, secret);
  console.log(data);
  return data;
};
