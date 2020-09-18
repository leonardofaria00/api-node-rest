import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '@models/Post';

export class PostsController {
  async getPosts(request: Request, response: Response) {
    try {
      const repositoryPost = getRepository(Post);
      const posts = await repositoryPost.find({ relations: ['user'] });

      const newPosts = posts.map((post) => {
        const objectReturn = {
          postId: post.id,
          message: post.messege,
          userId: post.user.id,
          userName: post.user.name,
        };
        return objectReturn;
      });

      return response.status(200).json(newPosts);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to find Posts', error });
    }
  }

  async createPosts(request: Request, response: Response) {
    try {
      const { messege, userId } = request.body;
      const repository = await getRepository(Post);

      const post = new Post();
      post.messege = messege;
      post.user = userId;

      await repository.save(post);
      return response
        .status(201)
        .json({ message: 'Post created sucess', ...post });
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to insert Post', error });
    }
  }

  putPosts(request: Request, response: Response) {
    return response.status(501).json({ messege: 'Method Not Implemented' });
  }
  deletePosts(request: Request, response: Response) {
    return response.status(501).json({ messege: 'Method Not Implemented' });
  }
}
