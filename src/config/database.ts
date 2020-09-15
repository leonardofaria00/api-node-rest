import { createConnection } from 'typeorm';
import { response } from 'express';

const connectDB = async (): Promise<any> => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'leonardo',
      password: 'password',
      database: 'api_db',
      entities: ['./src/models/*.ts'],
      synchronize: true,
      logging: false,
    });
    console.log('Database conectado com sucesso!', connection);
    return connection;
  } catch (error) {
    console.log('Erro ao conectar com o bando de dados', error);
  }
};

export default connectDB;