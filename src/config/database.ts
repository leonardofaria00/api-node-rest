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
    console.log('Database successfully connected!');
    return connection;
  } catch (error) {
    console.log('Error connecting to the database: ', error);
  }
};

export default connectDB;
