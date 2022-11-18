import Product from '../../interfaces/product.interface';
import schema from './schemas';

const validateProduct = (product: Product) => {
  const { error } = schema.addProduct
    .validate(product);
  if (error) return error.message;

  return null;
};

export default validateProduct;
