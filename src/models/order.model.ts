import { JwtPayload } from 'jsonwebtoken';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection
      .execute(`SELECT Orders.id, userId, JSON_ARRAYAGG(Products.id) AS productsIds 
      FROM Trybesmith.Orders, Trybesmith.Products WHERE orderId = Orders.id GROUP BY Orders.id;`);
    const [rows] = result;
    return rows as Order[];
  }

  public async createOrder(userId: number | JwtPayload): Promise<number> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    
    return insertId;
  }
}
