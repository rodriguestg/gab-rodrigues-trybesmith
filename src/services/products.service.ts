import connection from '../models/connection';
import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';
import validateProduct from './validations/validationProduct';
import Message from '../interfaces/message.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: Product): Promise<Message> {
    const vali = validateProduct(product);
    if (vali) {
      if (vali === '"name" is required'
        || vali === '"amount" is required') return { type: 'BAD_REQUEST', message: vali };
      return { type: 'BAD_VALIDATION', message: vali };
    }

    const prod = await this.model.create(product);
    
    return { type: null, message: prod };
  }
}

export default ProductService;
