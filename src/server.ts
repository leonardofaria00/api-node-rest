import express, { response, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import connectDB from '@config/database';
import { AuthRoutes } from '@routes/auth-routes';
import { UserRoutes } from '@routes/users-routes';
import { PostsRoutes } from '@routes/posts-routes';
import 'reflect-metadata';

class App {
  public app: express.Application;
  private userRoutes: UserRoutes = new UserRoutes();
  private postRoutes: PostsRoutes = new PostsRoutes();
  private authRoutes: AuthRoutes = new AuthRoutes();

  constructor() {
    this.app = express();
    this.middlewares();
    this.database();
    this.userRoutes.routes(this.app);
    this.postRoutes.routes(this.app);
    this.authRoutes.routes(this.app);

    const port = 3000;
    this.app.listen(port, () =>
      console.log(`Run API at http://localhost:${port}`)
    );
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'));
  }

  private async database(): Promise<any> {
    await connectDB();
  }
}
export default new App().app;
