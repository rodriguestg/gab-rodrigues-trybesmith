import { Pool, RowDataPacket } from 'mysql2/promise';
import Login from '../interfaces/login.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login(login: Login): Promise<Login | null> {
    const { username, password } = login;
    const [result] = await this.connection
      .execute<RowDataPacket[]>(
      'SELECT id, username, password FROM Trybesmith.Users WHERE username = ? AND password = ?;',
      [username, password],
    );

    if (result.length === 0) return null;

    return { id: result[0].id, username, password };
  }
}
