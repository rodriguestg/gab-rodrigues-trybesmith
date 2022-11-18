import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import OrderService from '../services/orders.service';
import idJwtUtils from '../utils/idJwt.utils';
import ProductService from '../services/products.service';

class OrderController {
  constructor(
    private orderService = new OrderService(),
    private productService = new ProductService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {    
    const orders = await this.orderService.getAll();
    res.status(statusCodes.OK).json(orders);
  };

  public createOrder = async (req: Request, res: Response) => {
    const order = req.body;
    const token = req.header('Authorization');
    if (!token) return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    const { id } = idJwtUtils(token);
    if (!id) return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    const resultOrder = await this.orderService.createOrder(order, id);
    if (resultOrder.type) { 
      if (resultOrder.type === 'BAD_REQUEST') {
        return res.status(statusCodes.BAD_REQUEST).json({ message: resultOrder.message });
      }
      return res.status(statusCodes.BAD_VALIDATION).json({ message: resultOrder.message });
    }
    await order.productsIds.map((productId: number) => this.productService
      .createByOrder(productId, resultOrder));
    res.status(statusCodes.CREATED).json({ userId: id, productsIds: order.productsIds });
  };
}

export default OrderController;
