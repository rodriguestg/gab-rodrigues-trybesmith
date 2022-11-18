import connection from '../models/connection';
import LoginModel from '../models/login.model';
import Login from '../interfaces/login.interface';

class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async login(user: Login): Promise<Login | null> {
    const loginUser = await this.model.login(user);
    if (!loginUser) return null;
      
    const { id, username, password } = loginUser;
    return { id, username, password };
  }
}

export default LoginService;
