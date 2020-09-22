import { createConnection } from 'typeorm';
require('dotenv').config();

const connectDB = async (): Promise<any> => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
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
