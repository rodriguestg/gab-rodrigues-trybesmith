import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'tokenpadrao';

const algorithm = 'HS256';
const expiresIn = '7d';

const tokenGenerate = (username: string, id = 1) => jwt.sign({
  data: { id, user: username } }, secret, { expiresIn, algorithm });

export default tokenGenerate;
