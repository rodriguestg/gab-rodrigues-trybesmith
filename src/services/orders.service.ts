import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interface';
import { Haha } from '../models/product.model';
import validateOrder from './validations/validationOrder';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    
    return orders;
  }

  public async createOrder(productIds: Haha, idUser: number): Promise<any> {
    const vali = validateOrder(productIds);
    if (vali) {
      const err = '"productsIds" must contain at least 1 items';
      if (vali === '"productsIds" is required') return { type: 'BAD_REQUEST', message: vali };
      if (vali === err) {
        return { type: 'BAD_VALIDATION', message: '"productsIds" must include only numbers' };
      }
      return { type: 'BAD_VALIDATION', message: vali };
    }

    const id = await this.model.createOrder(idUser);
    return id;
  }
}

export default OrderService;
