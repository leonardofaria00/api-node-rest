import { PostsController } from '@controllers/PostsController';
import multer from 'multer';
import multerConfig from '@config/multer';

export class PostsRoutes {
  private controller = new PostsController();

  public routes(app) {
    app.get('/posts', this.controller.getPosts);
    app.post(
      '/posts',
      multer(multerConfig).single('file'),
      this.controller.createPosts
    );
    app.put('/posts', this.controller.putPosts);
    app.delete('/posts', this.controller.deletePosts);
  }
}
