import { PostsController } from '@controllers/PostsController';

export class PostsRoutes {
  private controller = new PostsController();

  public routes(app) {
    app.get('/posts', this.controller.getPosts);
  }
}
