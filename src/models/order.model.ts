import { Pool } from 'mysql2/promise';
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
}
