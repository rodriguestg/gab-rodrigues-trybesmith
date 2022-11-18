import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public register(user: User): Promise<User> {
    return this.model.register(user);
  }
}

export default ProductService;
