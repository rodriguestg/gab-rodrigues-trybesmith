import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import ProductService from '../services/products.service';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(statusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const { type, message } = await this.productService.create(product);
    
    if (type) { 
      if (type === 'BAD_REQUEST') {
        return res.status(statusCodes.BAD_REQUEST).json({ message });
      }
      return res.status(statusCodes.BAD_VALIDATION).json({ message });
    }
    return res.status(statusCodes.CREATED).json(message);
  };
}

export default ProductController;
