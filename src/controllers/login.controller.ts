import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import LoginService from '../services/login.service';
import tokenGenerate from '../utils/jwt.utils';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const login = req.body;
    if (!login.username || !login.password) {
      let message = '"username" is required';
      if (!login.password) { message = '"password" is required'; }
      return res.status(statusCodes.BAD_REQUEST).json({ message });
    }
    const userLogin = await this.loginService.login(login);
    if (!userLogin) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
    const { id, username } = userLogin;
    const token = tokenGenerate(username, id);
    res.status(statusCodes.OK).json({ token });
  };
}

export default LoginController;
