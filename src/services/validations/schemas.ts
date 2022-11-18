import Joi from 'joi';

const addProduct = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const addUser = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().integer().min(1).required(),
  password: Joi.string().min(8).required(),
});

const addOrder = Joi.object({
  productsIds: Joi.array().min(1).required(),
});

export default {
  addProduct,
  addUser,
  addOrder,
};
