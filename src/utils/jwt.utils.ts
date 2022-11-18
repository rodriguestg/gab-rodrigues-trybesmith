import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'tokenpadrao';

const algorithm = 'HS256';
const expiresIn = '7d';

const tokenGenerate = (username: string) => jwt.sign({
  data: { user: username } }, secret, { expiresIn, algorithm });

export default tokenGenerate;
