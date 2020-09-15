import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '@models/Post';

export class PostsController {
  async getPosts(request: Request, response: Response) {
    try {
      const repository = getRepository(Post);
      const posts = await repository.find();
      return response.status(200).json(posts);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to find Posts' });
    }
  }

  async createPosts(request: Request, response: Response) {
    try {
      const { messege } = request.body;
      const repository = await getRepository(Post);

      const post = new Post();
      post.messege = messege;

      await repository.save(post);
      return response.status(201).json(messege);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to insert Post' });
    }
  }

  putPosts(request: Request, response: Response) {
    return response.status(501).json({ messege: 'Method Not Implemented' });
  }
  deletePosts(request: Request, response: Response) {
    return response.status(501).json({ messege: 'Method Not Implemented' });
  }
}
