import schema from './schemas';

const validateOrder = (order: object) => {
  const { error } = schema.addOrder
    .validate(order);
  if (error) return error.message;

  return null;
};

export default validateOrder;
