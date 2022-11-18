import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export interface Haha {
  productsIds: Array<number>;
}

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    
    return { id: insertId, ...product };
  }

  public async createByOrder(product: any, orderId: number): Promise<object> {
    const [{ affectedRows }] = await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, product],
    );
    console.log(affectedRows);
    
    return { userId: orderId, product };
  }
}
