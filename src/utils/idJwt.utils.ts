import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

interface JwtPayload {
  id: number | null;
}

export default (token: string): JwtPayload | any => {
  try {
    const data = jwt.verify(token, secret) as JwtPayload;
    if (!data) return { id: null };
    const { id } = data;
    return { id };
  } catch (error) {
    return error;
  }
};
