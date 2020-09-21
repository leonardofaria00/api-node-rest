import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '@models/Post';

export class PostsController {
  async getPosts(request: Request, response: Response) {
    try {
      const repository = getRepository(Post);
      const posts = await repository.find({ relations: ['user'] });

      const newPosts = posts.map((post) => {
        const objectReturn = {
          user: {
            id: post.user.id,
            name: post.user.name,
          },
          post: {
            id: post.id,
            title: post.title,
            url: post.url,
            message: post.messege,
          },
          image: {
            filename: post.fileName,
            originalname: post.originalName,
          },
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
      const { title, messege, userId, url } = request.body;
      const { filename, originalname } = request.file;

      const repository = await getRepository(Post);

      const post = new Post();
      post.title = title;
      post.messege = messege;
      post.user = userId;
      post.url = url;
      post.fileName = filename;
      post.originalName = originalname;

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
