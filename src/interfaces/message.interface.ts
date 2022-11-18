import Login from './login.interface';
import Product from './product.interface';
import User from './user.interface';

export default interface Message {
  type: string | null;
  message: number | Login | string | Product | User;
}