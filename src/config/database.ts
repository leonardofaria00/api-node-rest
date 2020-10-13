import { Connection, createConnection } from 'typeorm';
require('dotenv').config();

const connectDB = async (): Promise<Connection> => {
  try {
    const connection = await createConnection({
      type: 'mysql',
      port: 3306,
      host: process.env.DATABASE_AWS_HOST,
      username: process.env.DATABASE_AWS_USERNAME,
      password: process.env.DATABASE_AWS_PASSWORD,
      database: process.env.DATABASE_AWS_SCHEMA,
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
