import User from '../../interfaces/user.interface';
import schema from './schemas';

const validateUser = (user: User) => {
  const { error } = schema.addUser
    .validate(user);
  if (error) return error.message;

  return null;
};

export default validateUser;
