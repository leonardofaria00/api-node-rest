import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '@models/Post';

export class PostsController {
  async getPosts(request: Request, response: Response) {
    try {
      const repository = getRepository(Post);
      const posts = await repository.find({ relations: ['user'] });

      const postDTO = posts.map((post) => {
        const obj = {
          user: {
            id: post.user.id,
            name: post.user.name,
          },
          post: {
            id: post.id,
            title: post.title,
            message: post.messege,
            createdAt: post.date,
          },
          image: {
            url: post.url,
            filename: post.filename,
            originalname: post.originalname,
          },
        };
        return obj;
      });

      return response.status(200).json(postDTO);
    } catch (error) {
      return response
        .status(400)
        .json({ messege: 'Opps, error to find Posts', error });
    }
  }

  async createPosts(request: Request, response: Response) {
    try {
      const { title, messege, userId } = request.body;
      const { key, originalname, location = '' } = request.file;
      const repository = await getRepository(Post);
      const post = new Post();
      post.user = userId;
      post.title = title;
      post.messege = messege;
      post.url = location;
      post.filename = key;
      post.originalname = originalname;

      await repository.save(post);

      return response
        .status(201)
        .json({ message: 'Post created success', ...post });
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
