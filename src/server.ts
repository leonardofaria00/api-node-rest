import express, { response, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyparser from 'body-parser';
import morgan from 'morgan';
import connectDB from '@config/database';
import { UserRoutes } from '@routes/users-routes';
import 'reflect-metadata';
import { PostsRoutes } from '@routes/posts-routes';

class App {
  public app: express.Application;
  public apiRoutes: UserRoutes = new UserRoutes();
  private postRoutes: PostsRoutes = new PostsRoutes();

  constructor() {
    this.app = express();
    this.middlewares();
    this.database();
    this.apiRoutes.routes(this.app);
    this.postRoutes.routes(this.app);

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
