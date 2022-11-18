import Joi from 'joi';

const addProduct = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const a = 'a';

export default {
  addProduct,
  a,
};
