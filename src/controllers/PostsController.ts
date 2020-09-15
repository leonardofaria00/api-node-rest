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
}
