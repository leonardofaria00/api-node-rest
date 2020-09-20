import { PostsController } from '@controllers/PostsController';

export class PostsRoutes {
  private controller = new PostsController();

  public routes(app) {
    app.get('/posts', this.controller.getPosts);
    app.post('/posts', this.controller.createPosts);
    app.put('/posts', this.controller.putPosts);
    app.delete('/posts', this.controller.deletePosts);
  }
}
