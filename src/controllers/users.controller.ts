import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import UserService from '../services/users.service';
import tokenGenerate from '../utils/jwt.utils';

class UserController {
  constructor(private userService = new UserService()) { }

  public register = async (req: Request, res: Response) => {
    const user = req.body;
    const token = tokenGenerate(user.username);
    // const userCreated = await this.userService.register(user);
    const { type, message } = await this.userService.register(user);
    if (type) { 
      if (type === 'BAD_REQUEST') {
        return res.status(statusCodes.BAD_REQUEST).json({ message });
      }
      return res.status(statusCodes.BAD_VALIDATION).json({ message });
    }
    // if (!userCreated) return res.status(statusCodes.BAD_REQUEST).json(userCreated);
    return res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;
