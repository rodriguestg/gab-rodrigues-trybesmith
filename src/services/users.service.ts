import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import Message from '../interfaces/message.interface';
import validateUser from './validations/validationUser';

class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async register(user: User): Promise<Message> {
    const vali = validateUser(user);
    if (vali) {
      if (vali.includes('is required')) return { type: 'BAD_REQUEST', message: vali };
      return { type: 'BAD_VALIDATION', message: vali };
    }
    
    return { type: null, message: await this.model.register(user) };
  }
}

export default ProductService;
